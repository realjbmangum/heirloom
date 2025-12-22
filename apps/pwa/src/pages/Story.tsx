import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Pause, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Story {
  id: string;
  title: string;
  media_type: string;
  media_url: string;
  duration_seconds: number;
  category: string;
  created_at: string;
}

export default function StoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadStory();
  }, [id]);

  const loadStory = async () => {
    if (!id) return;

    const { data } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .single();

    if (data) {
      setStory(data);
    }
    setLoading(false);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleDelete = async () => {
    if (!story || !confirm('Are you sure you want to delete this recording?')) return;

    setDeleting(true);

    // Delete from storage
    const path = story.media_url.split('/stories/')[1];
    if (path) {
      await supabase.storage.from('stories').remove([path]);
    }

    // Delete from database
    await supabase.from('stories').delete().eq('id', story.id);

    navigate('/vault');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      childhood: 'bg-blue-100 text-blue-700',
      career: 'bg-green-100 text-green-700',
      family: 'bg-purple-100 text-purple-700',
      faith: 'bg-amber-100 text-amber-700',
      legacy: 'bg-heritage-green/10 text-heritage-green',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-charcoal-ink/60">Loading...</p>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-charcoal-ink/60">Story not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-heritage-green/10 px-5 py-4 safe-top">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft className="w-6 h-6 text-charcoal-ink" />
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 text-red-500"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="px-5 py-6">
        {/* Title & Meta */}
        <h1 className="text-2xl font-serif text-heritage-green mb-2">
          {story.title || 'Untitled Recording'}
        </h1>
        <div className="flex items-center gap-3 mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(story.category)}`}>
            {story.category}
          </span>
          <span className="text-sm text-charcoal-ink/50">
            {formatDate(story.created_at)}
          </span>
        </div>

        {/* Audio Player */}
        <div className="card">
          <audio
            ref={audioRef}
            src={story.media_url}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
          />

          {/* Play Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-heritage-green text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={story.duration_seconds || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-heritage-green/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-heritage-green"
            />
            <div className="flex justify-between text-sm text-charcoal-ink/50">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(story.duration_seconds || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
