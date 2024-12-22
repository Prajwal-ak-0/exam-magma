import { FiGithub, FiLinkedin } from 'react-icons/fi'
import Link from 'next/link'

interface TeamMember {
  name: string
  branch: string
  semester: number
  bio: string
  image: string
  links: {
    linkedin: string
    github: string
  }
}

const teamMembers: TeamMember[] = [
  {
    name: "Chiranth",
    branch: "CSE AI & ML",
    semester: 5,
    bio: "Passionate about building scalable web applications and exploring new technologies.",
    image: "https://avatars.githubusercontent.com/Chiranth-070",
    links: {
      linkedin: "https://www.linkedin.com/in/chiranth-h-n-2a20842b4/",
      github: "https://github.com/Chiranth-070",
    }
  },
  {
    name: "Jnanesh P S",
    branch: "Cyber Security",
    semester: 5,
    bio: "Creative designer focused on crafting beautiful and intuitive user experiences.",
    image: "https://avatars.githubusercontent.com/JnaneshaPS",
    links: {
      linkedin: "https://www.linkedin.com/in/jnanesha-p-s-291067289/",
      github: "https://github.com/JnaneshaPS",
    }
  },
  {
    name: "Suchith G",
    branch: "Information Science",
    semester: 5,
    bio: "Backend enthusiast with a strong foundation in system design and architecture.",
    image: "https://avatars.githubusercontent.com/SuchitG04",
    links: {
      linkedin: "https://www.linkedin.com/in/suchitg/",
      github: "https://github.com/SuchitG04",
    }
  },
  {
    name: "Prajwal A K",
    branch: "CSE AI & ML",
    semester: 5,
    bio: "Frontend specialist passionate about creating responsive and accessible web applications.",
    image: "https://avatars.githubusercontent.com/Prajwal-ak-0",
    links: {
      linkedin: "https://www.linkedin.com/in/akprajwal/",
      github: "https://github.com/Prajwal-ak-0",
    }
  }
]

interface AboutSectionProps {
  theme: 'light' | 'dark'
}

export function AboutSection({ theme }: AboutSectionProps) {
  return (
    <section 
      id="about" 
      className={`py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-16 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-neutral-900'
      }`}
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
          theme === 'light' ? 'text-neutral-800' : 'text-white'
        }`}>
          Meet Our Team
        </h2>
        <p className={`text-lg ${
          theme === 'light' ? 'text-neutral-600' : 'text-gray-300'
        }`}>
          The brilliant minds behind CodeLab
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`relative rounded-xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 ${
              theme === 'light' 
                ? 'bg-white hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)]' 
                : 'bg-neutral-800 hover:shadow-[0_20px_50px_rgba(20,_184,_166,_0.1)]'
            }`}
          >
            {/* Profile Image */}
            <div className="relative w-32 h-32 mx-auto mb-6 group">
              <div className={`absolute inset-0 rounded-full transition-all duration-300 group-hover:scale-105 ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20'
                  : 'bg-gradient-to-r from-teal-500/30 to-blue-500/30'
              }`}></div>
              <img
                src={member.image}
                alt={member.name}
                className="relative w-32 h-32 rounded-full object-cover border-2 border-teal-500 transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=14b8a6&color=fff&size=128`;
                }}
              />
            </div>

            {/* Member Info */}
            <h3 className={`text-xl font-semibold mb-2 transition-colors ${
              theme === 'light' ? 'text-neutral-800' : 'text-white'
            }`}>
              {member.name}
            </h3>
            <p className={`text-sm font-medium mb-1 ${
              theme === 'light' ? 'text-teal-600' : 'text-teal-400'
            }`}>
              {member.branch}
            </p>
            <p className={`text-sm mb-4 ${
              theme === 'light' ? 'text-neutral-500' : 'text-gray-400'
            }`}>
              {member.semester}th Semester
            </p>
            <p className={`text-sm mb-6 ${
              theme === 'light' ? 'text-neutral-600' : 'text-gray-300'
            }`}>
              {member.bio}
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-4">
              <Link
                href={member.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  theme === 'light'
                    ? 'text-neutral-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-110'
                    : 'text-gray-400 hover:bg-blue-900/30 hover:text-blue-400 hover:scale-110'
                }`}
              >
                <FiLinkedin size={20} />
              </Link>
              <Link
                href={member.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  theme === 'light'
                    ? 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 hover:scale-110'
                    : 'text-gray-400 hover:bg-neutral-700 hover:text-white hover:scale-110'
                }`}
              >
                <FiGithub size={20} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
