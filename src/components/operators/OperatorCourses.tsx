'use client';

import { useState } from 'react';
import { ChevronDown, GraduationCap, Clock, Sparkles } from 'lucide-react';
import type { OperatorCourse } from '@/data/types';

interface Props {
  courses: OperatorCourse[];
}

export default function OperatorCourses({ courses }: Props) {
  // Multiple courses can be open at once; the first is expanded by default.
  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (i: number) =>
    setOpen((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));

  return (
    <div className="space-y-3">
      {courses.map((course, i) => {
        const isOpen = open.includes(i);
        const panelId = `course-panel-${i}`;
        return (
          <div
            key={i}
            className={`border rounded-xl overflow-hidden transition-colors ${
              course.highlight ? 'border-green-300 bg-green-50/40' : 'border-gray-200'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-gray-50/70 transition-colors"
            >
              <span className="flex items-start gap-2.5 min-w-0">
                <GraduationCap className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
                <span className="min-w-0">
                  <span className="block font-semibold text-gray-900 text-sm leading-snug">
                    {course.title}
                  </span>
                  <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    {course.duration && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                        <Clock className="w-3 h-3" /> {course.duration}
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center text-[11px] font-medium px-1.5 py-0.5 rounded-full border ${
                        course.requiresPrerequisite
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-green-50 text-green-700 border-green-200'
                      }`}
                    >
                      {course.requiresPrerequisite ? 'Cerințe de participare' : 'Fără cerințe'}
                    </span>
                    {course.highlight && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded-full bg-green-700 text-white">
                        <Sparkles className="w-3 h-3" /> Agricultură
                      </span>
                    )}
                  </span>
                </span>
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              id={panelId}
              className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
              style={{ maxHeight: isOpen ? '500px' : '0px' }}
            >
              <p className="px-4 pb-4 pl-11 text-sm text-gray-600 leading-relaxed">
                {course.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
