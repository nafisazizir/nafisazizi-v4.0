import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { ProjectContentSkeleton } from '@/components/projects';

export default function ProjectLoading() {
  return (
    <div className="m-auto max-w-3xl py-12">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <ProjectContentSkeleton />
    </div>
  );
}
