
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Subject {
  id: string;
  name: string;
  description: string;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  subjectId: string;
}

interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  subjects: Subject[];
}

interface AppContextType {
  courses: Course[];
  selectedCourse: Course | null;
  selectedSubject: Subject | null;
  currentChapter: Chapter | null;
  userProgress: Record<string, number>;
  setSelectedCourse: (course: Course) => void;
  setSelectedSubject: (subject: Subject) => void;
  setCurrentChapter: (chapter: Chapter) => void;
  updateProgress: (chapterId: string, progress: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockCourses: Course[] = [
  {
    id: '1',
    name: 'LSS Exam',
    description: 'Lower Secondary School Examination Preparation',
    price: 2999,
    subjects: [
      {
        id: 's1',
        name: 'Mathematics',
        description: 'Complete Math curriculum for LSS',
        chapters: [
          { id: 'c1', title: 'Algebra Basics', videoUrl: '/videos/algebra.mp4', duration: '45:30', subjectId: 's1' },
          { id: 'c2', title: 'Geometry Fundamentals', videoUrl: '/videos/geometry.mp4', duration: '38:15', subjectId: 's1' }
        ]
      },
      {
        id: 's2',
        name: 'Science',
        description: 'Physics, Chemistry, and Biology',
        chapters: [
          { id: 'c3', title: 'Chemical Reactions', videoUrl: '/videos/chemistry.mp4', duration: '42:20', subjectId: 's2' },
          { id: 'c4', title: 'Newton\'s Laws', videoUrl: '/videos/physics.mp4', duration: '35:45', subjectId: 's2' }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'USS Exam',
    description: 'Upper Secondary School Examination Preparation',
    price: 3999,
    subjects: [
      {
        id: 's3',
        name: 'Advanced Mathematics',
        description: 'Advanced Math concepts for USS',
        chapters: [
          { id: 'c5', title: 'Calculus Introduction', videoUrl: '/videos/calculus.mp4', duration: '52:10', subjectId: 's3' }
        ]
      }
    ]
  }
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [courses] = useState<Course[]>(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});

  const updateProgress = (chapterId: string, progress: number) => {
    setUserProgress(prev => ({
      ...prev,
      [chapterId]: progress
    }));
  };

  return (
    <AppContext.Provider value={{
      courses,
      selectedCourse,
      selectedSubject,
      currentChapter,
      userProgress,
      setSelectedCourse,
      setSelectedSubject,
      setCurrentChapter,
      updateProgress
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
