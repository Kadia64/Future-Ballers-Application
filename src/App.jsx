import React, { useState, useEffect, useRef } from 'react';
import { Award, CalendarCheck, Users, Info, Mail, Menu, X, ChevronLeft, ChevronRight, Search } from 'lucide-react'; // Using lucide-react for icons

// Removed the local image import that caused the error.
// Using a placeholder image URL for the banner to ensure compilation.
// If you want to use a local image, ensure it's in the correct path (e.g., public folder)
// or imported correctly and then used as a variable.
// Placeholder for the main banner image
const mainBannerImage = 'https://placehold.co/1920x600/1a1a1a/e2e8f0?text=Future+Ballers+Action'; // Changed background to black/dark gray

// Placeholder for the navigation logo (as 'future_ballers_logo' was undefined)
const future_ballers_logo = 'https://placehold.co/60x60/1a1a1a/fcd34d?text=FBA'; // Gold text on black/dark gray


// Dummy Data
const dummyTeams = {
  boys: [
    { id: 'b1', name: 'Elite Hoops Academy', logo: 'https://placehold.co/150x150/1a1a1a/fcd34d?text=EHA', // Gold text on black
      roster: [
        { name: 'Michael Jordan', position: 'SG', height: "6'6\"" },
        { name: 'LeBron James', position: 'SF', height: "6'9\"" },
        { name: 'Stephen Curry', position: 'PG', height: "6'3\"" },
        { name: 'Kevin Durant', position: 'SF', height: "6'10\"" },
        { name: 'Nikola Jokic', position: 'C', height: "6'11\"" },
        { name: 'Jayson Tatum', position: 'SF', height: "6'8\"" },
        { name: 'Anthony Davis', position: 'PF/C', height: "6'10\"" },
        { name: 'Damian Lillard', position: 'PG', height: "6'2\"" },
      ],
      recentEvents: [
        { opponent: 'Wildcats', date: '2025-05-10', score: '65-62 W', tournament: 'Spring Classic' },
        { opponent: 'Storm Troopers', date: '2025-05-03', score: '58-70 L', tournament: 'May Madness' },
      ],
      coachingStaff: [
        { name: 'Coach Smith', role: 'Head Coach' },
        { name: 'Coach Davis', role: 'Assistant Coach' },
      ]
    },
    { id: 'b2', name: 'Next Gen Ballers', logo: 'https://placehold.co/150x150/1a1a1a/fcd34d?text=NGB', // Gold text on black
      roster: [
        { name: 'Luka Doncic', position: 'PG', height: "6'7\"" },
        { name: 'Jayson Tatum', position: 'SF', height: "6'8\"" },
        { name: 'Devin Booker', position: 'SG', height: "6'5\"" },
        { name: 'Joel Embiid', position: 'C', height: "7'0\"" },
        { name: 'Ja Morant', position: 'PG', height: "6'3\"" },
        { name: 'Zion Williamson', position: 'PF', height: "6'7\"" },
        { name: 'Trae Young', position: 'PG', height: "6'1\"" },
        { name: 'Karl-Anthony Towns', position: 'C', height: "7'0\"" },
      ],
      recentEvents: [
        { opponent: 'Titans', date: '2025-05-12', score: '72-68 W', tournament: 'Spring Classic' },
        { opponent: 'Avengers', date: '2025-05-05', score: '60-65 L', tournament: 'May Madness' },
      ],
      coachingStaff: [
        { name: 'Coach Johnson', role: 'Head Coach' },
        { name: 'Coach Williams', role: 'Assistant Coach' },
      ]
    },
    { id: 'b3', name: 'Hoop Dreams Elite', logo: 'https://placehold.co/150x150/1a1a1a/fcd34d?text=HDE', // Gold text on black
      roster: [
        { name: 'Shai Gilgeous-Alexander', position: 'PG', height: "6'6\"" },
        { name: 'Zion Williamson', position: 'PF', height: "6'7\"" },
        { name: 'Ja Morant', position: 'PG', height: "6'3\"" },
        { name: 'Donovan Mitchell', position: 'SG', height: "6'1\"" },
        { name: 'Bam Adebayo', position: 'C', height: "6'9\"" },
        { name: 'Bradley Beal', position: 'SG', height: "6'3\"" },
        { name: 'Domantas Sabonis', position: 'C', height: "6'11\"" },
        { name: 'De\'Aaron Fox', position: 'PG', height: "6'3\"" },
      ],
      recentEvents: [
        { opponent: 'Panthers', date: '2025-05-11', score: '68-60 W', tournament: 'Spring Classic' },
        { opponent: 'Dragons', date: '2025-05-04', score: '55-62 L', tournament: 'May Madness' },
      ],
      coachingStaff: [
        { name: 'Coach Brown', role: 'Head Coach' },
        { name: 'Coach Green', role: 'Assistant Coach' },
      ]
    },
  ],
  girls: [
    { id: 'g1', name: 'Lady Ballers United', logo: 'https://placehold.co/150x150/1a1a1a/fcd34d?text=LBU', // Gold text on black
      roster: [
        { name: 'Breanna Stewart', position: 'PF', height: "6'4\"" },
        { name: 'Sabrina Ionescu', position: 'PG', height: "5'11\"" },
        { name: 'A\'ja Wilson', position: 'PF', height: "6'4\"" },
        { name: 'Candace Parker', position: 'PF/C', height: "6'4\"" },
        { name: 'Elena Delle Donne', position: 'SF', height: "6'5\"" },
        { name: 'Jewell Loyd', position: 'SG', height: "5'10\"" },
        { name: 'Courtney Vandersloot', position: 'PG', height: "5'8\"" },
        { name: 'Brittney Griner', position: 'C', height: "6'9\"" },
      ],
      recentEvents: [
        { opponent: 'Queens', date: '2025-05-09', score: '55-52 W', tournament: 'Girls Invitational' },
        { opponent: 'Dames', date: '2025-05-02', score: '48-50 L', tournament: 'Mayhem Cup' },
      ],
      coachingStaff: [
        { name: 'Coach Carter', role: 'Head Coach' },
        { name: 'Coach Adams', role: 'Assistant Coach' },
      ]
    },
    { id: 'g2', name: 'Future Stars Girls', logo: 'https://placehold.co/150x150/1a1a1a/fcd34d?text=FSG', // Gold text on black
      roster: [
        { name: 'Caitlin Clark', position: 'PG', height: "6'0\"" },
        { name: 'Paige Bueckers', position: 'PG', height: "5'11\"" },
        { name: 'Angel Reese', position: 'PF', height: "6'3\"" },
        { name: 'Aliyah Boston', position: 'C', height: "6'5\"" },
        { name: 'Kelsey Plum', position: 'PG', height: "5'8\"" },
        { name: 'Jackie Young', position: 'SG', height: "6'0\"" },
        { name: 'Napheesa Collier', position: 'PF', height: "6'1\"" },
        { name: 'Arike Ogunbowale', position: 'SG', height: "5'8\"" },
      ],
      recentEvents: [
        { opponent: 'Vixens', date: '2025-05-08', score: '60-58 W', tournament: 'Girls Invitational' },
        { opponent: 'Storm', date: '2025-05-01', score: '52-55 L', tournament: 'Mayhem Cup' },
      ],
      coachingStaff: [
        { name: 'Coach Miller', role: 'Head Coach' },
        { name: 'Coach White', role: 'Assistant Coach' },
      ]
    },
  ],
};

const dummyEvents = {
  boys: [
    { id: 'be1', type: 'tournament', name: 'Illinois State Championship', time: 'June 22-23, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Illinois+State+Championship',
      details: { ageGroup: '10U-17U', date: 'June 22-23, 2025', location: 'UIC Credit Union 1 Arena, Chicago, IL', entryFee: '$500', manager: { name: 'John Doe', phone: '555-123-4567', email: 'john.doe@fba.com' } }
    },
    { id: 'be5', type: 'tournament', name: 'Summer Classic Invitational', time: 'June 15-16, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Summer+Invite', // Black bg, gold text
      details: { ageGroup: '13U-17U', date: 'June 15-16, 2025', location: 'Pleasant Run Rec Center, Springfield, IL', entryFee: '$475', manager: { name: 'David Lee', phone: '555-111-2222', email: 'david.lee@fba.com' } }
    },
    { id: 'bc3', type: 'camp', name: 'Next Level Training Camp', time: 'June 10-12, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Next+Level+Camp', // Black bg, gold text
      details: { manager: { name: 'Coach Williams', email: 'coach.williams@fba.com', phone: '555-333-4444' } }
    },
    { id: 'be6', type: 'tournament', name: 'Midwest Hoopfest', time: 'June 25-26, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Midwest+Hoopfest', // Black bg, gold text
      details: { ageGroup: '10U-14U', date: 'June 25-26, 2025', location: 'Elmhurst University, Elmhurst, IL', entryFee: '$420', manager: { name: 'Sarah Chen', phone: '555-555-6666', email: 'sarah.chen@fba.com' } }
    },
    { id: 'bc4', type: 'camp', name: 'Guard Skills Clinic', time: 'June 18-19, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Guard+Clinic', // Black bg, gold text
      details: { manager: { name: 'Coach Alex', email: 'coach.alex@fba.com', phone: '555-777-8888' } }
    },
    { id: 'be2', type: 'tournament', name: 'Summer Slam Fest', time: 'July 15-16, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Summer+Slam', // Black bg, gold text
      details: { ageGroup: '12U-16U', date: 'July 15-16, 2025', location: 'Pleasant Run Rec Center, Springfield, IL', entryFee: '$450', manager: { name: 'Jane Smith', phone: '555-987-6543', email: 'jane.smith@fba.com' } }
    },
    { id: 'bc1', type: 'camp', name: 'Elite Skills Camp', time: 'August 1-3, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Skills+Camp', // Black bg, gold text
      details: { manager: { name: 'Coach Expert', email: 'coach.expert@fba.com', phone: '555-111-2222' } }
    },
    { id: 'be3', type: 'tournament', name: 'Fall Classic Tournament', time: 'September 10-11, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Fall+Classic', // Black bg, gold text
      details: { ageGroup: '14U-18U', date: 'September 10-11, 2025', location: 'Romeoville Athletic Center, Romeoville, IL', entryFee: '$525', manager: { name: 'Mike Brown', phone: '555-333-4444', email: 'mike.brown@fba.com' } }
    },
    { id: 'bc2', type: 'camp', name: 'Holiday Hoop Camp', time: 'December 27-29, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Holiday+Camp', // Black bg, gold text
      details: { manager: { name: 'Coach Miller', email: 'coach.miller@fba.com', phone: '555-666-7777' } }
    },
    { id: 'be4', type: 'tournament', name: 'Winter Showdown', time: 'January 20-21, 2026', image: 'https://placehold.co/300x200/262626/fcd34d?text=Winter+Showdown', // Black bg, gold text
      details: { ageGroup: '10U-15U', date: 'January 20-21, 2026', location: 'Sporting Center, Rockford, IL', entryFee: '$480', manager: { name: 'Chris Green', phone: '555-888-9999', email: 'chris.green@fba.com' } }
    },
  ],
  girls: [
    { id: 'ge1', type: 'tournament', name: 'Girls Hoop Classic', time: 'June 29-30, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Hoop+Classic', // Black bg, gold text
      details: { ageGroup: '10U-17U', date: 'June 29-30, 2025', location: 'Morton College, Cicero, IL', entryFee: '$475', manager: { name: 'Sarah Lee', phone: '555-222-3333', email: 'sarah.lee@fba.com' } }
    },
    { id: 'gc3', type: 'camp', name: 'Summer Skills Intensive (Girls)', time: 'June 8-10, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Girls+Skills+Int.', // Black bg, gold text
      details: { manager: { name: 'Coach Brenda', email: 'coach.brenda@fba.com', phone: '555-666-1111' } }
    },
    { id: 'ge3', type: 'tournament', name: 'Illinois Girls Challenge', time: 'June 20-21, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Girls+Challenge', // Black bg, gold text
      details: { ageGroup: '12U-16U', date: 'June 20-21, 2025', location: 'Sportscore Two, Loves Park, IL', entryFee: '$450', manager: { name: 'Jessica Park', phone: '555-999-0000', email: 'jessica.park@fba.com' } }
    },
    { id: 'gc4', type: 'camp', name: 'Youth Fundamentals Camp (Girls)', time: 'June 14-16, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Youth+Fund.Camp', // Black bg, gold text
      details: { manager: { name: 'Coach Emily', email: 'coach.emily@fba.com', phone: '555-222-3333' } }
    },
    { id: 'ge4', type: 'tournament', name: 'June Jam Fest', time: 'June 7-8, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=June+Jam', // Black bg, gold text
      details: { ageGroup: '10U-13U', date: 'June 7-8, 2025', location: 'NIU Convocation Center, DeKalb, IL', entryFee: '$400', manager: { name: 'Robert Jones', phone: '555-444-5555', email: 'robert.jones@fba.com' } }
    },
    { id: 'gc1', type: 'camp', name: 'Girls Fundamental Camp', time: 'July 20-22, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Girls+Camp', // Black bg, gold text
      details: { manager: { name: 'Coach Taylor', email: 'coach.taylor@fba.com', phone: '555-444-5555' } }
    },
    { id: 'ge2', type: 'tournament', name: 'Autumn Challenge Cup', time: 'October 5-6, 2025', image: 'https://placehold.co/300x200/262626/fcd34d?text=Autumn+Cup', // Black bg, gold text
      details: { ageGroup: '11U-16U', date: 'October 5-6, 2025', location: 'Wintrust Sports Complex, Bedford Park, IL', entryFee: '$490', manager: { name: 'Laura White', phone: '555-777-8888', email: 'laura.white@fba.com' } }
    },
    { id: 'gc2', type: 'camp', name: 'New Year Skills Clinic', time: 'January 2-4, 2026', image: 'https://placehold.co/300x200/262626/fcd34d?text=New+Year+Clinic', // Black bg, gold text
      details: { manager: { name: 'Coach Davis', email: 'coach.davis@fba.com', phone: '555-101-2020' } }
    },
  ],
};

const dummyRankings = [
  { rank: 1, name: 'Brandon Ingram', image: 'https://placehold.co/50x50/333/fff?text=BI', position: 'SF', height: "6'8\"", aauTeam: 'Illinois Stars', highSchool: 'Morgan Park HS' },
  { rank: 2, name: 'Jalen Brunson', image: 'https://placehold.co/50x50/333/fff?text=JB', position: 'PG', height: "6'1\"", aauTeam: 'Chicago Elite', highSchool: 'Stevenson HS' },
  { rank: 3, name: 'Jabari Parker', image: 'https://placehold.co/50x50/333/fff?text=JP', position: 'PF', height: "6'8\"", aauTeam: 'Mac Irvin Fire', highSchool: 'Simeon HS' },
  { rank: 4, name: 'Max Christie', image: 'https://placehold.co/50x50/333/fff?text=MC', position: 'SG', height: "6'6\"", aauTeam: 'Rolling Meadows HS', highSchool: 'Rolling Meadows HS' },
  { rank: 5, name: 'Ayo Dosunmu', image: 'https://placehold.co/50x50/333/fff?text=AD', position: 'PG', height: "6'5\"", aauTeam: 'Mac Irvin Fire', highSchool: 'Morgan Park HS' },
  { rank: 6, name: 'Patrick Williams', image: 'https://placehold.co/50x50/333/fff?text=PW', position: 'SF', height: "6'8\"", aauTeam: 'Team Rose', highSchool: 'West Charlotte HS' }, // Assuming he moved from NC to IL for ranking
  { rank: 7, name: 'Tyger Campbell', image: 'https://placehold.co/50x50/333/fff?text=TC', position: 'PG', height: "5'11\"", aauTeam: 'MeanStreets', highSchool: 'La Lumiere School' }, // Assuming IL connection
  { rank: 8, name: 'DJ Steward', image: 'https://placehold.co/50x50/333/fff?text=DS', position: 'SG', height: "6'2\"", aauTeam: 'Mac Irvin Fire', highSchool: 'Whitney Young HS' },
  { rank: 9, name: 'Adam Miller', image: 'https://placehold.co/50x50/333/fff?text=AM', position: 'SG', height: "6'3\"", aauTeam: 'Illinois Wolves', highSchool: 'Morgan Park HS' },
  { rank: 10, name: 'Skyy Clark', image: 'https://placehold.co/50x50/333/fff?text=SC', position: 'PG', height: "6'3\"", aauTeam: 'Illinois Stars', highSchool: 'Montverde Academy' }, // Assuming IL connection
  { rank: 11, name: 'Jalen Wilson', image: 'https://placehold.co/50x50/333/fff?text=JW', position: 'SF', height: "6'8\"", aauTeam: 'Team FOE', highSchool: 'Guyer HS' },
  { rank: 12, name: 'Dalen Terry', image: 'https://placehold.co/50x50/333/fff?text=DT', position: 'SG', height: "6'7\"", aauTeam: 'Arizona Storm', highSchool: 'Hillcrest Prep' },
  { rank: 13, name: 'E.J. Liddell', image: 'https://placehold.co/50x50/333/fff?text=EL', position: 'PF', height: "6'7\"", aauTeam: 'Brad Beal Elite', highSchool: 'West High School' },
  { rank: 14, name: 'Jeremiah Robinson-Earl', image: 'https://placehold.co/50x50/333/fff?text=JR', position: 'PF', height: "6'9\"", aauTeam: 'Team Takeover', highSchool: 'IMG Academy' },
  { rank: 15, name: 'Kobe Brown', image: 'https://placehold.co/50x50/333/fff?text=KB', position: 'SF', height: "6'7\"", aauTeam: 'MOKAN Elite', highSchool: 'Lee\'s Summit West HS' },
  { rank: 16, name: 'Terrence Shannon Jr.', image: 'https://placehold.co/50x50/333/fff?text=TS', position: 'SG', height: "6'6\"", aauTeam: 'Mac Irvin Fire', highSchool: 'Lincoln Park HS' },
  { rank: 17, name: 'Max Abmas', image: 'https://placehold.co/50x50/333/fff?text=MA', position: 'PG', height: "6'1\"", aauTeam: 'Houston Hoops', highSchool: 'Jesuit College Prep' },
  { rank: 18, name: 'Kendall Brown', image: 'https://placehold.co/50x50/333/fff?text=KB', position: 'SF', height: "6'8\"", aauTeam: 'Pro Skills', highSchool: 'Sunrise Christian Academy' },
  { rank: 19, name: 'Julian Champagnie', image: 'https://placehold.co/50x50/333/fff?text=JC', position: 'SF', height: "6'8\"", aauTeam: 'PSA Cardinals', highSchool: 'Bishop Loughlin Memorial HS' },
  { rank: 20, name: 'Isaiah Livers', image: 'https://placehold.co/50x50/333/fff?text=IL', position: 'PF', height: "6'7\"", aauTeam: 'The Family', highSchool: 'Kalamazoo Central HS' },
];


// Navigation Bar Component
const Navbar = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-stone-900 shadow-lg font-inter sticky top-0 z-50"> {/* Changed blue/indigo to gray/stone */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          {/* Applied flex, items-center, and space-x-2 to make image and button side-by-side */}
          <div className="flex flex-shrink-0 items-center space-x-2"> 
            <img src={future_ballers_logo} className="w-12 h-12 object-contain" alt="FBA Logo" /> {/* Changed h-32 to h-12 */}
            <button
              onClick={() => setCurrentPage('home')}
              className="text-white text-2xl font-bold rounded-md px-3 py-2 hover:bg-gray-700 transition duration-300" // Changed blue to gray
            >
              Future Ballers Association
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <NavLink onClick={() => setCurrentPage('teams')} icon={<Users className="w-5 h-5 mr-1" />} text="Teams" />
            <NavLink onClick={() => setCurrentPage('events')} icon={<CalendarCheck className="w-5 h-5 mr-1" />} text="Events" />
            <NavLink onClick={() => setCurrentPage('rankings')} icon={<Award className="w-5 h-5 mr-1" />} text="Rankings" />
            <NavLink onClick={() => setCurrentPage('about')} icon={<Info className="w-5 h-5 mr-1" />} text="About Us" />
            <NavLink onClick={() => setCurrentPage('contact')} icon={<Mail className="w-5 h-5 mr-1" />} text="Contact" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800"> {/* Changed blue-800 to gray-800 */}
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLinkMobile onClick={() => { setCurrentPage('teams'); setIsOpen(false); }} icon={<Users className="w-5 h-5 mr-2" />} text="Teams" />
            <NavLinkMobile onClick={() => { setCurrentPage('events'); setIsOpen(false); }} icon={<CalendarCheck className="w-5 h-5 mr-2" />} text="Events" />
            <NavLinkMobile onClick={() => { setCurrentPage('rankings'); setIsOpen(false); }} icon={<Award className="w-5 h-5 mr-2" />} text="Rankings" />
            <NavLinkMobile onClick={() => { setCurrentPage('about'); setIsOpen(false); }} icon={<Info className="w-5 h-5 mr-2" />} text="About Us" />
            <NavLinkMobile onClick={() => { setCurrentPage('contact'); setIsOpen(false); }} icon={<Mail className="w-5 h-5 mr-2" />} text="Contact" />
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper components for Navbar
const NavLink = ({ onClick, icon, text }) => (
  <button
    onClick={onClick}
    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300" // Changed blue to gray
  >
    {icon}
    {text}
  </button>
);

const NavLinkMobile = ({ onClick, icon, text }) => (
  <button
    onClick={onClick}
    className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium flex items-center w-full text-left transition duration-300" // Changed blue to gray
  >
    {icon}
    {text}
  </button>
);

// Fade-in Section Component
const FadeInSection = (props) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(domRef.current); // Stop observing once visible
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    observer.observe(domRef.current);

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
};


// Home Page Content - UPDATED
const HomeContent = () => {
  // Combine all events
  const allEvents = [...dummyEvents.boys, ...dummyEvents.girls];

  // Function to get a random subset of events
  const getRandomEvents = (events, count) => {
    const shuffled = [...events].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    // Pick 10 random events initially (or fewer if total events < 10)
    setUpcomingEvents(getRandomEvents(allEvents, 10));
  }, []); // Run once on component mount


  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const eventsPerPage = 4; // Number of events visible at once

  // Calculate total possible slides based on the actual number of random events
  const totalPossibleSlides = Math.max(1, Math.ceil(upcomingEvents.length / eventsPerPage));

  const handleNextEvents = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalPossibleSlides);
  };

  const handlePrevEvents = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + totalPossibleSlides) % totalPossibleSlides);
  };

  // Calculate the translateX value for the carousel
  const translateXValue = -currentSlideIndex * 100;


  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] font-inter"> {/* Changed bg-gray-100 to bg-gray-50 */}
      {/* 1. Placeholder Image Section */}
      <FadeInSection>
        <div className="w-full h-[500px] bg-cover bg-center flex items-center justify-center relative rounded-b-xl shadow-lg overflow-hidden"
             style={{ backgroundImage: `url('${mainBannerImage}')` }}>
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <h1 className="text-white text-6xl font-extrabold text-center relative z-10 drop-shadow-2xl">
            Igniting the Future of Hoops
          </h1>
        </div>
      </FadeInSection>

      {/* 2. Homepage Description and Welcome Text Section */}
      <FadeInSection>
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Welcome to the <span className="text-amber-500">Future Ballers Association</span> {/* Changed text-blue-700 to text-amber-500 */}
          </h2>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Your premier destination for youth basketball in Illinois. We are dedicated to fostering talent, promoting sportsmanship, and creating competitive opportunities for young athletes.
          </p>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Here, you can easily explore top player rankings across the state, discover exciting upcoming tournaments and events, and connect with a vibrant community of AAU teams. Our platform makes it simple for team managers to register their teams and organize thrilling competitions that showcase the future stars of basketball.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-amber-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-amber-600 transition transform hover:scale-105 duration-300"> {/* Changed bg-blue-700 to bg-amber-500, hover:bg-blue-800 to hover:bg-amber-600 */}
              View Teams
            </button>
            <button className="px-8 py-4 bg-gray-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition transform hover:scale-105 duration-300"> {/* Changed bg-indigo-600 to bg-gray-700, hover:bg-indigo-700 to hover:bg-gray-800 */}
              Explore Events
            </button>
          </div>
        </div>
      </FadeInSection>

      {/* 3. Upcoming Events Section */}
      <FadeInSection>
        <div className="bg-gradient-to-br from-gray-100 to-white py-16 px-4 sm:px-6 lg:px-8 shadow-inner"> {/* Changed from-blue-100 to from-gray-100 */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">Featured Events</h2>
            {upcomingEvents.length > 0 ? (
              <div className="relative overflow-hidden py-4"> {/* Added py for button space */}
                {/* Previous Button */}
                {upcomingEvents.length > eventsPerPage && (
                  <button
                    onClick={handlePrevEvents}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-amber-500 text-white p-3 rounded-full shadow-md hover:bg-amber-600 transition transform hover:scale-110 focus:outline-none" // Changed blue to amber
                    aria-label="Previous events"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                {/* Carousel Track */}
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(${translateXValue}%)` }}
                >
                  {/* Map ALL upcomingEvents here, each taking its responsive width */}
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 p-3"> {/* Responsive width for each item */}
                      <div
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer overflow-hidden border border-gray-200 h-full flex flex-col"
                        onClick={() => { /* Placeholder for event detail navigation */ }}
                      >
                        <img src={event.image} alt={event.name} className="w-full h-40 object-cover" />
                        <div className="p-4 text-center flex-grow flex flex-col justify-center">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
                          <p className="text-gray-600">{event.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next Button */}
                {upcomingEvents.length > eventsPerPage && (
                  <button
                    onClick={handleNextEvents}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-amber-500 text-white p-3 rounded-full shadow-md hover:bg-amber-600 transition transform hover:scale-110 focus:outline-none" // Changed blue to amber
                    aria-label="Next events"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-600 text-xl">No featured events available. Check back soon!</p>
            )}
          </div>
        </div>
      </FadeInSection>

      {/* 4. Player and Team Search Section */}
      <FadeInSection>
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white rounded-t-xl shadow-lg"> {/* Changed bg-blue-800 to bg-gray-900 */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-8">Find Players & Teams</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label htmlFor="team-search" className="block text-xl font-semibold mb-3">
                  Search for a Team
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="team-search"
                    placeholder="e.g., Elite Hoops Academy"
                    className="w-full px-5 py-3 pr-12 rounded-lg text-gray-900 focus:outline-none focus:ring-amber-400 focus:border-amber-400 shadow-md transition duration-300" // Changed blue to amber
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="player-search" className="block text-xl font-semibold mb-3">
                  Search for a Ranked Player
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="player-search"
                    placeholder="e.g., Michael Jordan"
                    className="w-full px-5 py-3 pr-12 rounded-lg text-gray-900 focus:outline-none focus:ring-amber-400 focus:border-amber-400 shadow-md transition duration-300" // Changed blue to amber
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

// Teams Page Content
const TeamsContent = ({ setCurrentPage, setSelectedTeam, setSelectedGender, initialGender }) => {
  const [gender, setGender] = useState(initialGender || 'boys'); // Initialize with prop or default
  useEffect(() => {
    if (initialGender && initialGender !== gender) {
      setGender(initialGender);
    }
  }, [initialGender]); // Update if initialGender changes

  const teams = dummyTeams[gender];

  const handleTeamClick = (teamId) => {
    setSelectedTeam(teamId);
    setSelectedGender(gender); // Pass the selected gender to the TeamDetail
    setCurrentPage('teamDetail');
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-[calc(100vh-64px)] font-inter">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Our Teams</h2>

      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setGender('boys')}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ${
            gender === 'boys' ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // Changed blue to amber
          }`}
        >
          Boys Teams
        </button>
        <button
          onClick={() => setGender('girls')}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ${
            gender === 'girls' ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // Changed blue to amber
          }`}
        >
          Girls Teams
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            onClick={() => handleTeamClick(team.id)}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer p-6 flex flex-col items-center justify-center text-center border border-gray-200"
          >
            <img src={team.logo} alt={team.name} className="w-32 h-32 object-contain rounded-full mb-4 ring-4 ring-amber-500 p-1" /> {/* Changed ring-blue-500 to ring-amber-500 */}
            <h3 className="text-xl font-bold text-gray-800">{team.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

// Team Detail Page
const TeamDetail = ({ setCurrentPage, teamId, gender }) => {
  const team = dummyTeams[gender].find(t => t.id === teamId);

  if (!team) {
    return (
      <div className="container mx-auto p-6 text-center text-red-500 font-inter">
        Team not found.
        <button onClick={() => setCurrentPage('teams')} className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition duration-300"> {/* Changed blue to amber */}
          Back to Teams
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-[calc(100vh-64px)] font-inter">
      <div className="flex items-center mb-8">
        <button
          onClick={() => setCurrentPage('teams')}
          className="flex items-center text-amber-700 hover:text-amber-900 transition duration-300 mr-4" // Changed blue to amber
        >
          <ChevronLeft className="w-6 h-6 mr-1" /> Back to Teams
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center border border-gray-200">
        <img src={team.logo} alt={team.name} className="w-40 h-40 object-contain rounded-full mx-auto mb-6 ring-4 ring-amber-500 p-2" /> {/* Changed ring-blue-600 to ring-amber-500 */}
        <h2 className="text-4xl font-extrabold text-gray-900">{team.name}</h2>
      </div>

      {/* Roster Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">Roster</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100"> {/* Changed bg-blue-100 to bg-gray-100 */}
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Player Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Height
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {team.roster.map((player, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{player.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{player.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Events Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">Recent Events</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100"> {/* Changed bg-blue-100 to bg-gray-100 */}
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Opponent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Tournament
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {team.recentEvents.map((event, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.opponent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.score}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.tournament}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coaching Staff Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">Coaching Staff</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.coachingStaff.map((coach, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4"> {/* Changed blue-50 to gray-100, blue-200 to gray-200 */}
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-amber-800 text-2xl font-bold"> {/* Changed blue-200 to gray-200, blue-800 to amber-800 */}
                {coach.name.charAt(0)}
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-900">{coach.name}</p>
                <p className="text-gray-600">{coach.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Events Page Content
const EventsContent = ({ setCurrentPage, setSelectedEvent, setSelectedGender, initialGender }) => {
  const [gender, setGender] = useState(initialGender || 'boys'); // Initialize with prop or default
  useEffect(() => {
    if (initialGender && initialGender !== gender) {
      setGender(initialGender);
    }
  }, [initialGender]); // Update if initialGender changes

  const events = dummyEvents[gender];

  const handleEventClick = (eventId, eventType) => {
    setSelectedEvent(eventId);
    setSelectedGender(gender);
    setCurrentPage('eventDetail');
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-[calc(100vh-64px)] font-inter">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Upcoming Events & Camps</h2>

      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setGender('boys')}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ${
            gender === 'boys' ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // Changed blue to amber
          }`}
        >
          Boys Events/Camps
        </button>
        <button
          onClick={() => setGender('girls')}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ${
            gender === 'girls' ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // Changed blue to amber
          }`}
        >
          Girls Events/Camps
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => handleEventClick(event.id, event.type)}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer overflow-hidden border border-gray-200"
          >
            {/* The line below is where you can manually adjust the height */}
            <img src={event.image} alt={event.name} className="w-full h-64 object-cover" /> 
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold text-gray-800">{event.name}</h3>
              <p className="text-gray-600 mt-1">{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Event Detail Page
const EventDetail = ({ setCurrentPage, eventId, gender }) => {
  const event = dummyEvents[gender].find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="container mx-auto p-6 text-center text-red-500 font-inter">
        Event not found.
        <button onClick={() => setCurrentPage('events')} className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition duration-300"> {/* Changed blue to amber */}
          Back to Events
        </button>
      </div>
    );
  }

  const isTournament = event.type === 'tournament';

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-[calc(100vh-64px)] font-inter">
      <div className="flex items-center mb-8">
        <button
          onClick={() => setCurrentPage('events')}
          className="flex items-center text-amber-700 hover:text-amber-900 transition duration-300 mr-4" // Changed blue to amber
        >
          <ChevronLeft className="w-6 h-6 mr-1" /> Back to Events
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center border border-gray-200">
        <img src={event.image} alt={event.name} className="w-full max-w-lg h-64 object-cover rounded-lg mx-auto mb-6 shadow-md" />
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{event.name}</h2>
        <p className="text-2xl text-gray-700">{event.time}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2">
          {isTournament ? 'Tournament Details' : 'Camp Details'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
          {isTournament && (
            <>
              <p><strong className="font-semibold text-gray-900">Age Group:</strong> {event.details.ageGroup}</p>
              <p><strong className="font-semibold text-gray-900">Date:</strong> {event.details.date}</p>
              <p><strong className="font-semibold text-gray-900">Location:</strong> {event.details.location}</p>
              <p><strong className="font-semibold text-gray-900">Entry Fee:</strong> {event.details.entryFee}</p>
            </>
          )}
          <p><strong className="font-semibold text-gray-900">Manager:</strong> {event.details.manager.name}</p>
          <p><strong className="font-semibold text-gray-900">Phone:</strong> {event.details.manager.phone}</p>
          <p><strong className="font-semibold text-gray-900">Email:</strong> {event.details.manager.email}</p>
        </div>
        <div className="mt-8 text-center">
          <button className="px-8 py-4 bg-amber-500 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-amber-600 transition transform hover:scale-105 duration-300"> {/* Changed blue to amber */}
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};


// Rankings Page Content
const RankingsContent = () => (
  <div className="container mx-auto p-6 bg-gray-50 min-h-[calc(100vh-64px)] font-inter">
    <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Illinois Boys Player Rankings</h2>

    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100"> {/* Changed blue-100 to gray-100 */}
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Rank
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Player Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Position
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Height
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              AAU Team
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              High School
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dummyRankings.map((player) => (
            <tr key={player.rank} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-amber-700">{player.rank}.</td> {/* Changed text-blue-700 to text-amber-700 */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-300" />
                {player.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{player.position}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{player.height}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{player.aauTeam}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{player.highSchool}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// About Us Page Content
const AboutContent = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
    <div className="max-w-4xl text-center bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">About Future Ballers Association</h2>
      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        The Future Ballers Association (FBA) is a premier AAU basketball organization dedicated to nurturing the next generation of basketball talent in Illinois. We believe in providing a comprehensive platform where young athletes can develop their skills, compete at a high level, and foster a lifelong love for the game.
      </p>
      <p className="mt-4 text-lg text-amber-700 leading-relaxed"> {/* Changed text-blue-700 to text-amber-700 */}
        Our mission is to empower young players through competitive tournaments, top-tier coaching, and a supportive community. We host a variety of tournaments throughout the year, designed for both boys' and girls' AAU teams, ensuring equitable opportunities for all aspiring ballers. Our events are meticulously organized to provide a professional and exciting atmosphere for athletes, coaches, and fans.
      </p>
      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        Beyond competition, FBA is committed to recognizing excellence. Our website serves as a central hub where you can view the most up-to-date player rankings in Illinois, showcasing the dedication and achievements of our state's brightest stars. We also provide detailed information on upcoming events and camps, making it easy for teams and individual players to find their next challenge or opportunity for growth.
      </p>
      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        Join the Future Ballers Association community and be a part of a movement that's shaping the future of basketball, one dribble at a time.
      </p>
    </div>
  </div>
);

// Contact Us Page Content
const ContactContent = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Contact Us</h2>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" // Changed blue to amber
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm" // Changed blue to amber
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Your Message
          </label>
          <div className="mt-1">
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="shadow-sm focus:ring-amber-500 focus:border-amber-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-3 resize-y" // Changed blue to amber
              placeholder="Type your message here..."
            ></textarea>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-300" // Changed blue to amber
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
);

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null); // To carry gender context for details pages

  // Render content based on currentPage state
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomeContent />;
      case 'teams':
        return <TeamsContent setCurrentPage={setCurrentPage} setSelectedTeam={setSelectedTeam} setSelectedGender={setSelectedGender} initialGender={selectedGender} />;
      case 'teamDetail':
        return <TeamDetail setCurrentPage={setCurrentPage} teamId={selectedTeam} gender={selectedGender} />;
      case 'events':
        return <EventsContent setCurrentPage={setCurrentPage} setSelectedEvent={setSelectedEvent} setSelectedGender={setSelectedGender} initialGender={selectedGender} />;
      case 'eventDetail':
        return <EventDetail setCurrentPage={setCurrentPage} eventId={selectedEvent} gender={selectedGender} />;
      case 'rankings':
        return <RankingsContent />;
      case 'about':
        return <AboutContent />;
      case 'contact':
        return <ContactContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50"> {/* Changed bg-gray-100 to bg-gray-50 */}
      <Navbar setCurrentPage={setCurrentPage} />
      <main>
        {renderContent()}
      </main>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center font-inter"> {/* Changed bg-gray-800 to bg-gray-900 */}
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; 2025 Future Ballers Association. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-amber-400 transition duration-300">Privacy Policy</a> {/* Changed hover:text-blue-400 to hover:text-amber-400 */}
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-amber-400 transition duration-300">Terms of Service</a> {/* Changed hover:text-blue-400 to hover:text-amber-400 */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
