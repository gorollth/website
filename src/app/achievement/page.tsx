"use client";

import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: string;
  category: string;
  organizer: string;
  coverImage: string;
  images: string[];
  longDescription?: string;
}

const AchievementCard = ({
  title,
  description,
  date,
  icon,
  category,
  organizer,
  coverImage,
  images,
  onClick,
}: Achievement & { onClick: () => void }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-4 text-white">
        <div className="flex justify-between items-center">
          <span className="text-3xl">{icon}</span>
          <span className="ml-2 text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-48 bg-gray-100">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        {images.length > 0 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
            +{images.length} photos
          </div>
        )}
      </div>

      <div className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <span className="text-orange-500 text-sm font-medium">{date}</span>
        </div>
        <p className="text-gray-600 text-sm">By {organizer}</p>
        <p className="text-gray-600 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

const AchievementModal = ({
  achievement,
  onClose,
}: {
  achievement: Achievement;
  onClose: () => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === achievement.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? achievement.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Image Carousel */}
          <div className="relative h-96 bg-gray-100">
            {achievement.images.length > 0 ? (
              <img
                src={achievement.images[currentImageIndex]}
                alt={`${achievement.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={achievement.coverImage}
                alt={achievement.title}
                className="w-full h-full object-contain"
              />
            )}

            {achievement.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {achievement.images.length}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{achievement.title}</h2>
                <p className="text-gray-600">By {achievement.organizer}</p>
                <span className="text-orange-500 text-sm font-medium">
                  {achievement.date}
                </span>
              </div>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {achievement.category}
              </span>
            </div>
            <p className="text-gray-600">
              {achievement.longDescription || achievement.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AchievementPage() {
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "BIT Social Scale Up 2024",
      description:
        "Selected for business, project management, and soft skills training in BIT Social Scale Up 2024: Incubation Program by Edvisory and NIA",
      longDescription:
        "Selected as a participant in the prestigious BIT Social Scale Up program, which provided extensive training in business development, project management methodologies, and essential soft skills. This program aimed to equip participants with the knowledge and capabilities to effectively address real-world challenges and drive impactful solutions within their respective fields.",
      date: "2024",
      icon: "🚀",
      category: "Incubation",
      organizer: "Edvisory and NIA",
      coverImage: "/achievements/achievement1/achievement1.jpg",
      images: [
        "/achievements/achievement1/achievement1_1.png",
        "/achievements/achievement1/achievement1_2.png",
      ],
    },
    {
      id: 2,
      title: "HealthTech X 2 The Future",
      description:
        "Finalist in the top 22 teams, received a fund for development from HealthTech X 2 The Future by ThaiHealth",
      longDescription:
        "Finalist among the top 22 teams in the prestigious HealthTech X The Future competition, securing development funding to advance innovative solutions in healthcare technology. This recognition highlights our team's dedication, creativity, and ability to deliver impactful ideas that address pressing challenges in the healthcare industry. The funding provided has been instrumental in supporting our project, enabling us to further develop and refine our vision while positioning us to make a meaningful contribution to the field.",
      date: "2024",
      icon: "💵",
      category: "Funding",
      organizer: "ThaiHealth",
      coverImage: "/achievements/achievement2/achievement2.jpg",
      images: [
        "/achievements/achievement2/achievement2_1.jpg",
        "/achievements/achievement2/achievement2_2.jpg",
        "/achievements/achievement2/achievement2_3.png",
      ],
    },
  ].reverse();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-block">
          <h1 className="text-4xl font-bold mb-4 relative text-gray-700">
            Our Achievements
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"></div>
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Celebrating our milestones and successes as we continue to innovate
          and grow
        </p>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            {...achievement}
            onClick={() => setSelectedAchievement(achievement)}
          />
        ))}
      </div>

      {/* Achievement Modal */}
      {selectedAchievement && (
        <AchievementModal
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}

      {/* Footer Message */}
      <div className="text-center bg-orange-50 py-12 rounded-xl">
        <p className="text-gray-600 max-w-2xl mx-auto px-4">
          These achievements represent our commitment to excellence and
          innovation.
          <br />
          <span className="text-orange-500 font-medium">
            Stay tuned for more exciting milestones!
          </span>
        </p>
      </div>
    </div>
  );
}
