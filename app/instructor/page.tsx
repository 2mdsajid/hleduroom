import { instructor } from '@/lib/data/instructor';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Meet Our Expert Instructors</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructor.map((instructor) => (
            <div key={instructor.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="relative">
                <img className="w-full h-64 object-cover object-center" src={instructor.photo} alt={instructor.name} />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-gray-900 to-transparent w-full h-1/2 flex items-end p-4">
                  <h2 className="text-2xl font-bold text-white">{instructor.name}</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-lg font-semibold text-indigo-600 mb-2">{instructor.title}</p>
                <p className="text-gray-700 mb-4 text-sm">{instructor.bioSnippet}</p>
                
                <div className="mb-4">
                  <p className="text-gray-800 font-medium">Experience:</p>
                  <p className="text-gray-600 text-sm">{instructor.experience}</p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-800 font-medium">Subjects:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {instructor.subjects.map((subject, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-800 font-medium">Specialties:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {instructor.specialties.map((specialty, index) => (
                      <span key={index} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-6">
                  <p className="text-lg font-bold text-gray-900">
                    Success Stories: <span className="text-indigo-600">{instructor.successStoriesCount}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;