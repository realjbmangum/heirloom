import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Users, UserPlus } from 'lucide-react';
import { useFamilyTree } from '../hooks/useFamilyTree';
import type { FamilyMember } from '../hooks/useFamilyTree';
import { useAuth } from '../lib/auth';
import { FamilyTreeNode } from '../components/family/FamilyTreeNode';
import { MemberCard } from '../components/family/MemberCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BottomSheet, Modal } from '../components/ui/Modal';
import { EmptyState, LoadingState } from '../components/ui/EmptyState';
import { Avatar } from '../components/ui/Avatar';

type AddMemberForm = {
  full_name: string;
  birth_date: string;
  death_date: string;
  bio: string;
  is_placeholder: boolean;
};

type RelationshipType = 'parent' | 'child' | 'spouse' | 'sibling';

export default function FamilyTree() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const familyTree = useFamilyTree();

  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [showMemberSheet, setShowMemberSheet] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddRelationship, setShowAddRelationship] = useState(false);
  const [addingToMember, setAddingToMember] = useState<FamilyMember | null>(null);

  const [newMember, setNewMember] = useState<AddMemberForm>({
    full_name: '',
    birth_date: '',
    death_date: '',
    bio: '',
    is_placeholder: true,
  });

  const [selectedRelationType, setSelectedRelationType] = useState<RelationshipType>('parent');

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
    setShowMemberSheet(true);
  };

  const handleAddMember = async () => {
    if (!newMember.full_name.trim()) return;

    const member = await familyTree.addMember({
      family_id: '', // Will be set by hook
      user_id: null,
      full_name: newMember.full_name.trim(),
      birth_date: newMember.birth_date || null,
      death_date: newMember.death_date || null,
      avatar_url: null,
      bio: newMember.bio || null,
      is_placeholder: newMember.is_placeholder,
    });

    if (member && addingToMember) {
      // Add relationship
      await familyTree.addRelationship(
        addingToMember.id,
        member.id,
        selectedRelationType
      );
    }

    setShowAddMember(false);
    setAddingToMember(null);
    setNewMember({
      full_name: '',
      birth_date: '',
      death_date: '',
      bio: '',
      is_placeholder: true,
    });
  };

  const handleDeleteMember = async (memberId: string) => {
    if (confirm('Are you sure you want to remove this person from the family tree?')) {
      await familyTree.deleteMember(memberId);
      setShowMemberSheet(false);
      setSelectedMember(null);
    }
  };

  const handleStartAddRelationship = (member: FamilyMember) => {
    setAddingToMember(member);
    setShowMemberSheet(false);
    setShowAddRelationship(true);
  };

  const handleAddNewWithRelationship = (relationType: RelationshipType) => {
    setSelectedRelationType(relationType);
    setShowAddRelationship(false);
    setShowAddMember(true);
  };

  const handleAddExistingRelationship = async (relatedMember: FamilyMember) => {
    if (!addingToMember) return;

    await familyTree.addRelationship(
      addingToMember.id,
      relatedMember.id,
      selectedRelationType
    );

    setShowAddRelationship(false);
    setAddingToMember(null);
  };

  if (familyTree.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingState message="Loading family tree..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-ivory-linen/30">
      {/* Header */}
      <header className="bg-white border-b border-heritage-green/10 px-5 py-4 safe-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1">
              <ChevronLeft className="w-6 h-6 text-charcoal-ink" />
            </button>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-heritage-green" />
              <h1 className="heading-3">Family Tree</h1>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => {
              setAddingToMember(null);
              setShowAddMember(true);
            }}
          >
            Add
          </Button>
        </div>
      </header>

      <div className="px-5 py-6">
        {familyTree.members.length === 0 ? (
          <EmptyState
            icon={<Users className="w-8 h-8 text-heritage-green" />}
            title="Start your family tree"
            description="Add family members to create a visual representation of your family history"
            action={{
              label: 'Add First Member',
              onClick: () => setShowAddMember(true),
            }}
          />
        ) : (
          <div className="space-y-8">
            {/* Tree Visualization */}
            <Card variant="elevated" className="overflow-x-auto">
              <div className="min-w-max py-4">
                {/* Simplified tree view - grouped by generation */}
                {familyTree.treeNodes.length > 0 ? (
                  <div className="space-y-8">
                    {/* Render each root and its descendants */}
                    {familyTree.treeNodes.map((rootNode) => (
                      <div key={rootNode.member.id} className="space-y-6">
                        {/* Root generation */}
                        <div className="flex justify-center gap-4">
                          <FamilyTreeNode
                            member={rootNode.member}
                            isCurrentUser={rootNode.member.user_id === user?.id}
                            onSelect={handleSelectMember}
                          />
                          {rootNode.spouse && (
                            <>
                              <div className="flex items-center">
                                <div className="w-8 h-0.5 bg-heirloom-gold" />
                              </div>
                              <FamilyTreeNode
                                member={rootNode.spouse}
                                isCurrentUser={rootNode.spouse.user_id === user?.id}
                                onSelect={handleSelectMember}
                              />
                            </>
                          )}
                        </div>

                        {/* Children */}
                        {rootNode.children.length > 0 && (
                          <>
                            <div className="flex justify-center">
                              <div className="w-0.5 h-6 bg-heritage-green/30" />
                            </div>
                            <div className="flex justify-center gap-4">
                              {rootNode.children.map((childNode) => (
                                <div key={childNode.member.id} className="flex flex-col items-center">
                                  <FamilyTreeNode
                                    member={childNode.member}
                                    isCurrentUser={childNode.member.user_id === user?.id}
                                    onSelect={handleSelectMember}
                                  />
                                  {/* Grandchildren */}
                                  {childNode.children.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                      <div className="w-0.5 h-4 bg-heritage-green/30 mx-auto" />
                                      <div className="flex gap-2">
                                        {childNode.children.map((grandchild) => (
                                          <FamilyTreeNode
                                            key={grandchild.member.id}
                                            member={grandchild.member}
                                            isCurrentUser={grandchild.member.user_id === user?.id}
                                            onSelect={handleSelectMember}
                                            size="sm"
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Simple grid if no tree structure */
                  <div className="flex flex-wrap justify-center gap-4">
                    {familyTree.members.map((member) => (
                      <FamilyTreeNode
                        key={member.id}
                        member={member}
                        isCurrentUser={member.user_id === user?.id}
                        onSelect={handleSelectMember}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* All Members List */}
            <div>
              <h3 className="heading-4 mb-3">All Members ({familyTree.members.length})</h3>
              <div className="grid grid-cols-3 gap-3">
                {familyTree.members.map((member) => (
                  <Card
                    key={member.id}
                    variant="interactive"
                    padding="sm"
                    onClick={() => handleSelectMember(member)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <Avatar
                        src={member.avatar_url}
                        name={member.full_name}
                        size="md"
                        ring={member.user_id === user?.id ? 'green' : 'none'}
                      />
                      <p className="body-sm font-medium text-charcoal-ink mt-2 truncate max-w-full">
                        {member.full_name}
                      </p>
                      {member.is_placeholder && (
                        <span className="caption text-heirloom-gold">Placeholder</span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Member Detail Sheet */}
      <BottomSheet
        isOpen={showMemberSheet}
        onClose={() => {
          setShowMemberSheet(false);
          setSelectedMember(null);
        }}
        title="Family Member"
      >
        {selectedMember && (
          <MemberCard
            member={selectedMember}
            isCurrentUser={selectedMember.user_id === user?.id}
            relatives={familyTree.getMemberRelatives(selectedMember.id)}
            onEdit={() => {
              // TODO: Edit functionality
            }}
            onDelete={() => handleDeleteMember(selectedMember.id)}
            onAddRelationship={() => handleStartAddRelationship(selectedMember)}
          />
        )}
      </BottomSheet>

      {/* Add Member Modal */}
      <Modal
        isOpen={showAddMember}
        onClose={() => {
          setShowAddMember(false);
          setAddingToMember(null);
        }}
        title="Add Family Member"
      >
        <div className="space-y-4">
          {addingToMember && (
            <div className="bg-heritage-green/5 rounded-lg p-3 flex items-center gap-3">
              <Avatar src={addingToMember.avatar_url} name={addingToMember.full_name} size="sm" />
              <div>
                <p className="body-sm text-charcoal-ink">
                  Adding {selectedRelationType} to {addingToMember.full_name}
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="label-uppercase mb-1 block">Full Name *</label>
            <input
              type="text"
              value={newMember.full_name}
              onChange={(e) => setNewMember({ ...newMember, full_name: e.target.value })}
              className="input"
              placeholder="Enter name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-uppercase mb-1 block">Birth Date</label>
              <input
                type="date"
                value={newMember.birth_date}
                onChange={(e) => setNewMember({ ...newMember, birth_date: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label-uppercase mb-1 block">Death Date</label>
              <input
                type="date"
                value={newMember.death_date}
                onChange={(e) => setNewMember({ ...newMember, death_date: e.target.value })}
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="label-uppercase mb-1 block">Bio</label>
            <textarea
              value={newMember.bio}
              onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
              className="input min-h-[80px]"
              placeholder="A short description..."
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newMember.is_placeholder}
              onChange={(e) => setNewMember({ ...newMember, is_placeholder: e.target.checked })}
              className="w-4 h-4 rounded border-charcoal-ink/30"
            />
            <span className="body-sm text-charcoal-ink/60">
              This is a placeholder (no app account)
            </span>
          </label>

          <div className="flex gap-2 pt-2">
            <Button variant="secondary" fullWidth onClick={() => setShowAddMember(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleAddMember}
              disabled={!newMember.full_name.trim()}
            >
              Add Member
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Relationship Modal */}
      <Modal
        isOpen={showAddRelationship}
        onClose={() => {
          setShowAddRelationship(false);
          setAddingToMember(null);
        }}
        title="Add Relationship"
      >
        {addingToMember && (
          <div className="space-y-4">
            <p className="body-md text-charcoal-ink/60">
              How is this person related to {addingToMember.full_name}?
            </p>

            <div className="grid grid-cols-2 gap-2">
              {(['parent', 'child', 'spouse', 'sibling'] as RelationshipType[]).map((type) => (
                <Button
                  key={type}
                  variant={selectedRelationType === type ? 'primary' : 'secondary'}
                  onClick={() => setSelectedRelationType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>

            <div className="border-t border-charcoal-ink/10 pt-4">
              <p className="label-uppercase mb-3">Add new person</p>
              <Button
                variant="gold"
                fullWidth
                icon={<UserPlus className="w-5 h-5" />}
                onClick={() => handleAddNewWithRelationship(selectedRelationType)}
              >
                Create New Family Member
              </Button>
            </div>

            {familyTree.members.filter(m => m.id !== addingToMember.id).length > 0 && (
              <div className="border-t border-charcoal-ink/10 pt-4">
                <p className="label-uppercase mb-3">Or link existing member</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {familyTree.members
                    .filter(m => m.id !== addingToMember.id)
                    .map((member) => (
                      <button
                        key={member.id}
                        onClick={() => handleAddExistingRelationship(member)}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-charcoal-ink/5 transition-colors"
                      >
                        <Avatar src={member.avatar_url} name={member.full_name} size="sm" />
                        <span className="body-sm text-charcoal-ink">{member.full_name}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
