/* ==========================================================================
   CONTENT — edit this file to change everything on the site.
   --------------------------------------------------------------------------
   • Any string wrapped in [square brackets] shows up on the site as a
     dashed "fill me in" placeholder. Replace the whole thing, brackets too.
   • Images: drop files into /assets/<folder>/ and list them in `media`.
     An activity with fewer photos than `slots` shows empty slots that
     tell you where to put them.
   • Videos: { type: "video", src: "...mp4", poster: "...jpg" }
   ========================================================================== */

window.SITE = {
  person: {
    first: "Arnav",
    last: "Talreja",
    school: "Thomas Jefferson High School for Science and Technology",
    schoolShort: "TJHSST",
    classOf: "2027",
    location: "Northern Virginia",
    // One line under your name.
    headline: "Robotics builder, nonprofit co-founder, and tennis player at TJHSST.",
    tagline: "Robots, the kids who learn to build them, and a tennis court in between.",
    // About section — one string per paragraph.
    about: [
      "I'm a senior at Thomas Jefferson High School for Science and Technology, passionate about solving problems at the intersection of hardware and software to help my community.",
    ],
    education: [
      { school: "Thomas Jefferson High School for Science and Technology", detail: "Class of 2027" },
    ],
    // Coursework in the About section (courses only, no grades).
    coursework: {
      current: ["Quantum Physics and Optics Research Lab", "Quantum Physics and Electrodynamics", "Machine Learning 1", "Machine Learning 2", "Math Techniques for Scientists and Engineers", "AP Statistics", "AP Environmental Science", "AP English Language and Composition", "AP United States Government and Politics"],
      completed: [
        ["Grade 11", ["Multivariable Calculus (Dual Enrollment)", "Linear Algebra (Dual Enrollment)", "AP Physics C: Mechanics and Electricity & Magnetism", "Artificial Intelligence 1", "Artificial Intelligence 2", "Web Application Development", "Mobile Application Development", "AP United States History", "AP French Language and Culture", "English 11 Honors"]],
        ["Grade 10", ["AP Calculus BC", "AP Computer Science A", "AP Macroeconomics", "AP Microeconomics", "Chemistry 1 Honors", "World History and Geography 2 Honors", "English 10 Honors", "French 3", "Health and PE 10", "Driver Education"]],
        ["Grade 9", ["Math 4 Honors (TJ)", "Math 5 (TJ)", "Research Statistics 1 Honors", "Foundations of Computer Science Honors", "Biology 1 Honors", "Design and Technology", "African American History Honors", "English 9 Honors", "French 2", "Economics and Personal Finance", "Health and PE 9"]],
        ["Middle school, for high school credit", ["Algebra 2 Honors", "Geometry Honors", "Algebra 1 Honors", "French 1"]],
      ],
    },
    // Shown under the top photo. Wrap words in *asterisks* to darken them.
    intro:
      "I build competition robots with *FTC 14607 Robot Uprising*, co-founded *Growing Up with Robotics* so thousands of younger students could learn to do the same, and spend whatever time is left on the *tennis court*.",
    portrait: "assets/me/portrait.jpg",
    // Big photo at the top of the page.
    // Rotating photos at the top of the page, first one shows on load.
    // pos is the crop focus ("x% y%") when the photo is wider or taller than the frame.
    heroSlides: [
      { src: "assets/ftc/states-team.jpg", cap: "FTC 14607 Robot Uprising at the Chesapeake State Championship", pos: "50% 35%" },
      { src: "assets/tennis/04-first-win.jpg", cap: "My first tournament win, with coaches Farshad Garakani and Michael Harper", pos: "55% 35%" },
      { src: "assets/early/first-tennis-trophy.jpg", cap: "An early tennis trophy", pos: "50% 35%" },
      { src: "assets/econ/va-state-champions.jpg", cap: "With our teacher after winning the Virginia Economics Challenge", pos: "45% 60%" },
      { src: "assets/early/infinite-overload.jpg", cap: "Team Infinite Overload, my first FTC team", pos: "50% 40%" },
      { src: "assets/early/meeting-a-pro.jpg", cap: "Meeting Nick Kyrgios", pos: "50% 35%" },
      { src: "assets/projects/hearthealth-house-of-code.jpg", cap: "Presenting HeartHealth at #HouseOfCode in Washington, D.C.", pos: "55% 40%" },
      { src: "assets/early/jhu-cty.jpg", cap: "Johns Hopkins Center for Talented Youth awards ceremony", pos: "50% 45%" },
      { src: "assets/cpr/temple-compressions.jpg", cap: "Hands-only CPR training with Gwyneth’s Gift", pos: "50% 60%" },
      { src: "assets/cpr/cpr-training-gym.jpg", cap: "Setting up a Gwyneth’s Gift CPR training" },
      { src: "assets/early/swim-meet.jpg", cap: "Swim meet ribbons", pos: "50% 55%" },
      { src: "assets/tennis/tournament-award.jpg", cap: "Tournament award", pos: "50% 45%" },
      { src: "assets/projects/ar-glasses-assembled.jpg", cap: "The AR glasses I’m building for AR PulseGuide", fit: "contain" },
      { src: "assets/early/robotics-awards.jpg", cap: "Award day at a robotics competition", pos: "50% 50%" },
      { src: "assets/fll/fll-team.jpg", cap: "Where it started: FIRST LEGO League", pos: "50% 40%" },
      { src: "assets/early/skiing.jpg", cap: "On the slopes", pos: "50% 40%" },
      { src: "assets/gur/aymsummercampgroup.jpg", cap: "A Growing Up with Robotics summer camp", pos: "50% 50%" },
    ],
    email: "arnavt777@gmail.com",
    resume: null, // e.g. "assets/me/Arnav-Talreja-Resume.pdf"
    links: [
      { label: "GitHub", href: "[https://github.com/…]" },
      { label: "Growing Up with Robotics", href: "https://www.growingupwithrobotics.org/" },
    ],
  },

  // Shown in a row near the top: organizations, competitions, awards, press.
  recognition: ["FIRST Tech Challenge", "Chesapeake State Championship", "Growing Up with Robotics", "TJHSST", "Gwyneth’s Gift Foundation", "Congressional App Challenge", "National Economics Challenge", "National Personal Finance Challenge", "The Washington Post All-Met"],



  /* ---------------------------------------------------------------------
     CPR & GWYNETH'S GIFT — the story section right after About.
     Steps run oldest to newest; `phase` labels the stage of the story.
     The full details still live in the timeline.
     --------------------------------------------------------------------- */
  cpr: {
    title: "CPR & Gwyneth’s Gift",
    lead: "When my neighbor Gwyneth went into cardiac arrest at school, no one around her knew CPR. She died days later from an anoxic brain injury. My family did not want her story to repeat, so we started teaching CPR across our community. Each training showed me what one room of trained people can do, and how many people never make it into that room. Through technology, I’ve been able to increase CPR awareness, share lifesaving knowledge, and make CPR instruction more effective.",
    stats: [
      ["10,000+", "Community members trained in CPR"],
      ["1,000+", "Longfellow students trained in CPR every year"],
      ["1st", "HEARTSafe middle school in Virginia"],
      ["1", "Life saved by students we trained"],
    ],
    steps: [
      { phase: "Why it started", when: "2019", title: "Gwyneth’s story",
        text: "Gwyneth went into cardiac arrest at school and no one around her knew CPR. I started working with her family’s foundation, Gwyneth’s Gift, as a Northern Virginia Community Ambassador so that the next time someone collapses, the people nearby know what to do.",
        img: "assets/cpr/longfellow-gwyneths-parents.jpg", cap: "Gwyneth’s parents speak to Longfellow students (photo: FCPS)" },
      { phase: "In person", when: "2019 – Present", title: "Training our community, starting at Longfellow",
        text: "I worked with Gwyneth’s family and local fire departments to organize CPR training events across our community, training over 10,000 people. At Longfellow Middle School I organized the first CPR/AED trainings, making it the first HEARTSafe middle school in FCPS, and turned them into a yearly program where every student learns CPR, more than 1,000 students every year, with over 1,000 trained in a single day. FCPS featured the program and my work on it in “Lifesaving Lessons Learned at Longfellow Middle School.”",
        img: "assets/cpr/longfellow-hands-only-cpr.jpg", cap: "Longfellow students learn hands-only CPR (photo: FCPS)",
        link: { label: "Read the FCPS feature", href: "https://longfellowms.fcps.edu/features/lifesaving-lessons-learned-longfellow-middle-school", external: true } },
      { phase: "In code", when: "2020 – 2022", title: "Reaching the people we couldn’t train",
        text: "With every training we organized, I realized there were thousands of others we couldn’t reach. To bridge the gap, I taught myself mobile development and built HeartHealth, an online platform with a crowdsourced AED database and a 5-step emergency CPR walk-through that automatically dials 911. Rep. Don Beyer named it the winner of the 2022 Congressional App Challenge for VA-08, and I presented it at #HouseOfCode in Washington, D.C.",
        img: "assets/projects/hearthealth-house-of-code.jpg", cap: "Presenting HeartHealth at #HouseOfCode",
        link: { label: "HeartHealth", href: "#view/p13" } },
      { phase: "The proof", when: "March 2025", title: "Three Longfellow students save a life", story: true,
        text: "Three eighth graders used the CPR they learned in our trainings to save a classmate’s father after he went into cardiac arrest on a Scouts trip. His chance of survival was about 5%. Because they started CPR in time, he is fine today. It is exactly what didn’t happen for Gwyneth.",
        img: "assets/cpr/fcps-cpr-story.jpg", cap: "The three students (photo: FCPS)",
        link: { label: "Read the FCPS story", href: "https://longfellowms.fcps.edu/node/7369", external: true } },
      { phase: "In code", when: "2026", title: "CPR360, free on the App Store",
        text: "I rebuilt HeartHealth from the ground up for whoever happens to be there when someone collapses: a full-screen CPR coach with a calm voice and compression metronome, one-tap alerts that text your location and open the dialer for 911, and a map of nearby AEDs that works with no signal.",
        img: "assets/projects/cpr360-hero.jpg", contain: true, cap: "CPR360",
        link: { label: "Get CPR360", href: "https://apps.apple.com/us/app/cpr360/id6797158944", external: true } },
      { phase: "In code", when: "2026", title: "AR PulseGuide",
        text: "Most people freeze because they aren’t sure where their hands go. AR PulseGuide uses the iPhone’s camera and depth sensor to mark exactly where to check a pulse and place your hands on a real person, then corrects you in real time instead of teaching passively.",
        img: "assets/projects/arpulse-demo-1.jpg", cap: "Live demo",
        link: { label: "AR PulseGuide", href: "#view/p8" } },
      { phase: "In hardware", when: "2026", title: "My own AR glasses",
        text: "A rescuer shouldn’t have to hold a phone. I’m fabricating augmented-reality glasses so the guidance runs hands-free, with both hands on the chest and 911 a voice command away.",
        img: "assets/projects/ar-glasses-assembled.jpg", contain: true, cap: "Assembled glasses" },
      { phase: "Back in person", when: "September 2026", title: "Taking it beyond school",
        text: "CPR is a skill everyone should know, so I’ve taken the trainings to a local temple and community centers, including a full-room session where everyone practiced hands-only CPR.",
        img: "assets/cpr/temple-compressions.jpg", cap: "Community training at a local temple" },
      { phase: "Next", when: "Upcoming", title: "Every middle school in the region",
        text: "I’m working with local officials to bring the Longfellow model of CPR/AED training to every FCPS middle school, so every student knows what to do when it counts." },
    ],
  },

  /* ---------------------------------------------------------------------
     ACTIVITIES — each one gets its own section on the home page and
     opens into its own page. Order here = order on the site.
     --------------------------------------------------------------------- */
  activities: [
    {
      id: "ftc",
      title: "Robot Uprising",
      kicker: "FTC Team 14607",
      role: "Captain",
      years: "2023 – Present",
      place: "TJHSST",
      summary:
        "Competition robotics with FIRST Tech Challenge Team 14607. Each season we design, CAD, build, code and drive a new robot for that year's game, then take it from scrimmages to the Chesapeake State Championship.",
      body: [],
      points: [
        "Captain for the 2026–27 season after serving as Junior Captain (2025–26) and Lead Programmer (2024–25)",
        "Programs computer vision-assisted autonomous routines with RoadRunner motion planning and three-wheel odometry",
        "Architected a non-blocking finite-state machine framework so the robot drives and operates mechanisms at the same time",
        "Designs assemblies in Fusion 360 and wires servos to the REV Control Hub",
        "Builds on the foundations from FIRST LEGO League, moving from LEGO kits to custom aluminum robots",
        "Competed at the Chesapeake State Championship",
        "Brings the robot to community STEM nights and schools so younger students can drive it, ask questions, and see that high schoolers built it from aluminum and code",
      ],
      details: [
        ["Team", "FTC 14607 Robot Uprising"],
        ["Program", "FIRST Tech Challenge"],
        ["Competed at", "Chesapeake State Championship"],
        ["Role", "Captain; previously Lead Programmer"],
        ["Awards", "State Motivate Award, 2x Regional Inspire Award, 3x Chesapeake State Finalist"],
      ],
      slots: 1,
      media: [
        { src: "assets/ftc/states-team.jpg", cap: "Chesapeake State Championship" },
        { src: "assets/ftc/robot-demo.jpg", cap: "Showing kids the robot up close" },
        { type: "video", src: "assets/ftc/odometry-hold.mp4", poster: "assets/ftc/odometry-hold-poster.jpg", cap: "Odometry position hold: pushed off its mark, the robot drives back" },
      ],
    },
    {
      id: "gur",
      title: "Growing Up with Robotics",
      kicker: "Co-Founder & Co-President",
      role: "Co-Founder & Co-President",
      years: "2023 – Present",
      place: "Five countries, run from Virginia",
      link: { label: "growingupwithrobotics.org", href: "https://www.growingupwithrobotics.org/" },
      summary:
        "A student-run nonprofit that pairs K–12 students with near-peer mentors and runs free camps, courses, and team-to-team coaching. It started in 2023 with two high schoolers teaching CAD to one middle schooler.",
      body: [
        "I co-founded GUR to make a real impact in the robotics community, both globally and close to home: helping more people learn technical skills, build with confidence, and compete. Most of all, I want robotics to be something people genuinely enjoy being part of.",
      ],
      points: [
        "Co-founded a student-run nonprofit that began with two high schoolers teaching CAD to one middle schooler",
        "Built GUR into a nonprofit to give our teaching a credible name, so we could reach out to professionals and sponsors and turn their support into free training, mentoring and resources for kids",
        "Leads four free programs: 1-on-1 mentorship, team-to-team coaching from FLL to FRC, open courses in CAD, Python, C++ and embedded systems, and multi-day camps",
        "Partners with schools and community centers to host multi-day robotics camps",
        "Reached 7,000+ students across five countries with a network of 110+ volunteer mentors",
        "Raised $19,500+ to keep every program free",
        "Runs summer robotics camps with the youth group AYM, starting with 45 middle schoolers in August 2025",
        "Plans lessons each week, reaches out to schools and partner nonprofits, and prepares kits for upcoming workshops and camps",
      ],
      details: [
        ["Founded", "2023"],
        ["Role", "Co-Founder & Co-President"],
        ["Students reached", "7,000+"],
        ["Volunteer mentors", "110+"],
        ["Raised", "$19,500+, all programs free"],
      ],
      slots: 1,
      media: [
        { src: "assets/gur/aymsummercampgroup.jpg", cap: "Summer camp, full group" },
        { src: "assets/gur/img_6799.jpg", cap: "First robot builds" },
        { src: "assets/gur/fllmentoring.jpg", cap: "One-on-one FLL coaching" },
      ],
    },
    {
      id: "research",
      title: "Research",
      kicker: "INOVA · VCU · George Mason University",
      role: "Research Intern",
      years: "2024 – Present",
      place: "Northern Virginia",
      body: [],
      points: [
        "Designing an ultrasound pipeline at INOVA that combines a foundation model (USFM), MedSAM2 segmentation and attention-based multiple-instance learning to predict stroke risk",
        "Co-authored a study of four endovascular treatments for limb-threatening peripheral artery disease in 26,249 Medicare patients, submitted to the Journal of Vascular Surgery",
        "Co-authored a retrospective comparison of carotid endarterectomy and transcarotid artery revascularization using propensity score matching; under internal peer review",
        "Building a VCU pipeline that fuses four cardiac MRI sequences into a 16-segment tissue map for HFpEF, benchmarking quantum preprocessing against classical methods",
        "Engineered an online interval scheduling system at George Mason’s ASSIP that predicted the actual room placement for 93% of reservations, and presented the poster to GMU faculty",
      ],
      details: [
        ["Labs", "INOVA Health System (Vascular Division), Virginia Commonwealth University, George Mason University (ASSIP)"],
        ["Fields", "Medical imaging, machine learning, cardiovascular outcomes, online algorithms"],
        ["Output", "Manuscript submitted to the Journal of Vascular Surgery; second manuscript in review; ASSIP research poster"],
      ],
      slots: 1,
      folder: "assets/research/",
      media: [
        { src: "assets/research/Talreja_Arnav_2024ASSIP_Poster.jpg", cap: "ASSIP research poster, George Mason University, 2024" },
      ],
    },
  ],

  /* ---------------------------------------------------------------------
     TENNIS JOURNEY — the horizontal strip under Work, oldest first.
     Add a video with  video: "assets/tennis/clip.mp4"  (src becomes its poster).
     Source clips live in assets/_originals/tennis/videos.
     --------------------------------------------------------------------- */
  tennis: {
    note: "Since age 3",
    lead: "Tennis is so important to me. I picked up a racket when I was three, and I often lose myself in the hours I’ve spent on the court since.",
    chapters: [
      { when: "Age 3", title: "First swings", text: "My first time on a court, with a racket almost as big as I was.", video: "assets/tennis/01-age-3.mp4", src: "assets/tennis/01-age-3-poster.jpg" },
      { when: "2014", title: "Indoor lessons", text: "Learning to turn, swing, and actually follow through.", video: "assets/tennis/02-indoor-lessons.mp4", src: "assets/tennis/02-indoor-lessons-poster.jpg" },
      { when: "Juniors", title: "Courtplay Athletics", text: "Training alongside other junior players with Coach Farshad Garakani.", src: "assets/tennis/03-courtplay-squad.jpg", pos: "50% 60%" },
      { when: "First win", title: "A trophy, finally", text: "My first tournament win, with my coaches Farshad Garakani and Michael Harper.", src: "assets/tennis/04-first-win.jpg", pos: "55% 50%" },
      { when: "Every season", title: "Under the lights", text: "Practice didn't stop when the sun went down.", src: "assets/tennis/05-night-practice.jpg", pos: "20% 45%" },
      { when: "Growing up", title: "Building a forehand", text: "Hours of drilling the forehand, one basket of balls at a time.", src: "assets/tennis/06-indoor-forehand.jpg", pos: "40% 50%" },
      { when: "Summer 2023", title: "Hard courts", text: "Long summer sessions on outdoor courts.", video: "assets/tennis/07-summer-outdoors.mp4", src: "assets/tennis/07-summer-outdoors-poster.jpg" },
      { when: "May 2024", title: "Region & District Champion", text: "Won the District and Regional singles titles as a freshman, taking the region final over Woodson's Ryan Battaglia 11-9 in the deciding tiebreak.", src: "assets/tennis/region-champion-2024.jpg", pos: "50% 35%", link: { label: "tjTODAY story", href: "https://www.tjtoday.org/38280/sports/freshman-arnav-talreja-secures-regional-singles-tennis-title/" } },
      { when: "June 2024", title: "Washington Post All-Met", text: "Named to the Washington Post's Spring All-Met boys' tennis team as a freshman.", src: "assets/tennis/allmet-2024.jpg", pos: "50% 30%", link: { label: "2024 All-Met list", href: "https://www.washingtonpost.com/sports/2024/06/20/boys-tennis-all-met/" } },
      { when: "May 2025", title: "Region & District Champion, again", text: "Defended both the District and Regional singles titles, then reached the VHSL Class 6 state finals in singles and in doubles with Jonah Treitler.", src: null, panel: { top: "Varsity Singles", big: "2025", lines: ["District Champion", "Region Champion", "State Finalist, Class 6"] }, link: { label: "2025 state results", href: "https://cardinalnews.org/2025/06/09/vhsl-state-tournament-schedule-for-tennis/" } },
      { when: "June 2025", title: "Washington Post All-Met, again", text: "Named to the Washington Post's Spring All-Met boys' tennis team for the second straight year.", src: null, panel: { top: "The Washington Post", big: "All-Met", lines: ["Spring 2025", "Boys’ Tennis", "Second straight year"] }, link: { label: "2025 All-Met list", href: "https://www.washingtonpost.com/sports/2025/06/27/boys-tennis-all-met-2025/" } },
      { when: "Now", title: "Still on court", text: "Varsity captain and #1 singles at TJ, with a 10 UTR and 4-star recruit status.", video: "assets/tennis/08-training-now.mp4", src: "assets/tennis/08-training-now-poster.jpg" },
    ],
  },

  /* ---------------------------------------------------------------------
     GALLERY — grouped photos. Any photo already used in the timeline
     is skipped automatically, so nothing shows up twice.
     wide: true spans two columns.
     --------------------------------------------------------------------- */
  gallery: [
    { id: "early", title: "Growing up", media: [
      { src: "assets/early/first-tennis-trophy.jpg", cap: "An early tennis trophy" },
      { src: "assets/early/meeting-a-pro.jpg", cap: "Meeting Nick Kyrgios" },
      { src: "assets/early/jhu-cty.jpg", cap: "Johns Hopkins CTY awards ceremony", wide: true },
      { src: "assets/early/swim-meet.jpg", cap: "Swim meet ribbons" },
      { src: "assets/early/skiing.jpg", cap: "On the slopes" },
      { src: "assets/fll/fll-team.jpg", cap: "FIRST LEGO League" },
    ] },
    { id: "ftc", title: "Robot Uprising", media: [
      { src: "assets/ftc/robot-demo.jpg", cap: "Showing kids the robot up close", wide: true },
      { src: "assets/ftc/driver-practice.jpg", cap: "Driver practice" },
      { src: "assets/ftc/strategy-whiteboard.jpg", cap: "Strategy on the whiteboard" },
      { src: "assets/ftc/late-night-build.jpg", cap: "Late-night build" },
      { src: "assets/ftc/mentors-presenting.jpg", cap: "Presenting to the community", wide: true },
      { src: "assets/ftc/outreach-board.jpg", cap: "Outreach board" },
      { src: "assets/ftc/outreach-event.jpg", cap: "STEM night outreach" },
      { src: "assets/ftc/robot-lab.jpg", cap: "In the robotics lab" },
    ] },
    { id: "gur", title: "Growing Up with Robotics", media: [
      { src: "assets/gur/img_6799.jpg", cap: "First robot builds", wide: true },
      { src: "assets/gur/flltutor.jpg", cap: "FLL team we tutor" },
      { src: "assets/gur/img_6796.jpg", cap: "Building with LEGO SPIKE" },
      { src: "assets/gur/gur_5eff0633.jpg", cap: "Teaching a class" },
      { src: "assets/gur/img_6853.jpg", cap: "Testing robots together" },
      { src: "assets/gur/img_6872.jpg", cap: "Camp check-in", wide: true },
      { src: "assets/gur/gur_9c2d6025.jpg", cap: "Hands-on build session" },
      { src: "assets/gur/img_6248.jpg", cap: "Sorting parts" },
      { src: "assets/gur/img_6792.jpg", cap: "Coding the robots" },
      { src: "assets/gur/img_6908.jpg", cap: "Debugging with campers" },
      { src: "assets/gur/aymsummercamp.jpg", cap: "Camp kickoff" },
      { src: "assets/gur/guestspeaker.jpg", cap: "Guest speaker session", wide: true },
      { src: "assets/gur/img_6267.jpg", cap: "One-on-one help" },
      { src: "assets/gur/img_6821.jpg", cap: "Robot ready for the challenge" },
      { src: "assets/gur/img_9084.jpg", cap: "Online class prep" },
    ] },
    { id: "cpr", title: "CPR", media: [
      { src: "assets/cpr/temple-demo.jpg", cap: "Community CPR training at a local temple", wide: true },
      { src: "assets/cpr/fcps-gwyneths-gift.jpg", cap: "The Longfellow students meet Gwyneth’s Gift (photo: FCPS)" },
    ] },
    { id: "tennis", title: "Tennis", media: [
      { src: "assets/tennis/tournament-award.jpg", cap: "Tournament award" },
      { src: "assets/tennis/05-night-practice.jpg", cap: "Under the lights" },
      { src: "assets/tennis/06-indoor-forehand.jpg", cap: "Building a forehand" },
      { type: "video", src: "assets/tennis/07-summer-outdoors.mp4", poster: "assets/tennis/07-summer-outdoors-poster.jpg", cap: "Summer hard courts" },
      { type: "video", src: "assets/tennis/02-indoor-lessons.mp4", poster: "assets/tennis/02-indoor-lessons-poster.jpg", cap: "Indoor lessons" },
    ] },
    { id: "econ", title: "Economics", media: [
      { src: "assets/econ/va-state-champions.jpg", cap: "With our teacher, Virginia Economics Challenge champions", wide: true },
    ] },
  ],

  /* ---------------------------------------------------------------------
     TIMELINE — sorted automatically by date ("YYYY" or "YYYY-MM").
     type: robotics | gur | tennis | research | school | award
     img is optional. Entries in [brackets] are placeholders.
     --------------------------------------------------------------------- */
  timeline: [
    // date / end: "YYYY" or "YYYY-MM"; end can be "Present". org + place are optional.
    { date: "2026-09", type: "school", title: "Senior Year", org: "TJHSST", place: "Alexandria, VA",
    points: [
      "Captains the FTC robotics team and the varsity tennis team",
      "Conducts research at INOVA Health System and Virginia Commonwealth University",
      "Builds CPR360, AR PulseGuide and the Hospital Price Transparency Platform",
    ] },
    { date: "2026-05", type: "award", title: "National Finalist, 5th Place", org: "National Economics Challenge", place: "Atlanta, GA",
    points: [
      "Represented Virginia at the national finals in the Adam Smith Division",
      "Placed 5th in the nation",
    ],
    link: { label: "2026 national finalists (Council for Economic Education)", href: "https://www.councilforeconed.org/congratulations-to-our-2026-national-economic-challenge-finalists/" } },
    { date: "2026-04", type: "award", title: "Virginia State Champion", org: "National Economics Challenge", place: "Federal Reserve Bank of Richmond", img: "assets/econ/fed-reserve-richmond.jpg", imgPos: "50% 70%",
    points: [
      "Won the 2026 Virginia Economics Challenge, Adam Smith Division, as Team Economic Explorers",
      "Qualified to represent Virginia at the national finals",
    ],
    link: { label: "Official 2026 state results (VCEE)", href: "https://vcee.org/programs/virginia-economics-virginia-personal-finance-challenges/" } },
    { date: "2026-06", type: "award", title: "National Semifinalist", org: "National Personal Finance Challenge", place: "Atlanta, GA",
    points: [
      "Represented Virginia at the National Personal Finance Challenge finals",
      "Advanced to the national semifinals",
    ],
    link: { label: "2026 national finalists (Council for Economic Education)", href: "https://www.councilforeconed.org/congratulations-to-our-2026-national-personal-finance-challenge-finalists/" } },
    { date: "2026-04", type: "award", title: "Virginia State Champion", org: "National Personal Finance Challenge", place: "VCU School of Business, Richmond",
    points: [
      "Won the Virginia Personal Finance Challenge as team TJHSST A, finishing first at the in-person state championship",
      "Earned Virginia’s spot at the National Personal Finance Challenge finals",
    ],
    link: { label: "Official 2026 state results (VCEE)", href: "https://vcee.org/programs/virginia-economics-virginia-personal-finance-challenges/" } },
    { date: "2026", type: "gur", title: "7,000 Students Reached", org: "Growing Up with Robotics", img: "assets/gur/img_6927.jpg",
    points: [
      "Reached 7,000+ students across five countries",
      "Built a network of 110+ volunteer mentors",
      "Raised $19,500+ to keep every program free",
    ] },
    { date: "2026-08", type: "gur", title: "Summer Robotics Camp with AYM", org: "Growing Up with Robotics × AYM", img: "assets/gur/img_6811.jpg",
    points: [
      "Ran a four-evening robotics camp with the youth group AYM where middle schoolers used the engineering design process to solve a real task: getting a robot to find its own way along a path",
      "Opened each night with a hands-on design challenge, from popsicle-stick and spaghetti-and-marshmallow towers to catapults, so campers practiced planning, building, testing and improving",
      "Taught CAD, electronics and sensors, and programming, then had teams build LEGO SPIKE robots that follow a taped path with a color sensor",
      "Ended with a final robot challenge where teams tested their designs and a winners reveal",
      "Left campers with skills that carry into any team or classroom: breaking a big problem into steps, testing and debugging until something works, and collaborating under a deadline",
    ] },
    { date: "2026-03", type: "gur", title: "Online Programming Spring Camp", org: "Growing Up with Robotics",
    points: [
      "Ran a free week-long Python camp for K–8 students over spring break",
      "Taught two hours of lessons a day, held office hours, and guided every student through a personal project in Google Classroom",
    ] },
    { date: "2026-02", type: "gur", title: "Freedom Hill Elementary Science Fair", org: "Growing Up with Robotics",
    points: [
      "Ran hands-on LEGO SPIKE Prime activities with 13 kits for elementary students and families",
      "Talked with families about FIRST and how kids can join a robotics team",
    ] },
    { date: "2026", end: "Present", type: "research", title: "Research Intern", org: "INOVA Health System, Vascular Division", place: "Fairfax, VA",
    points: [
      "Designing an ultrasound pipeline that combines a foundation model (USFM), MedSAM2 segmentation and attention-based multiple-instance learning to predict stroke risk",
      "Applying double machine learning to isolate stroke risk beyond stenosis, validated on leakage-controlled, within-patient artery pairs",
      "Co-authored a study comparing four endovascular treatments (atherectomy, drug-coated balloons, stents and balloon angioplasty) for limb-threatening peripheral artery disease in 26,249 Medicare patients; internally peer-reviewed at INOVA and submitted to the Journal of Vascular Surgery",
      "Co-authored a retrospective study comparing carotid endarterectomy with transcarotid artery revascularization for stroke prevention, analyzing stroke, death and complication rates with propensity score matching; manuscript under internal peer review",
    ] },
    { date: "2025-08", end: "Present", type: "research", title: "Research Intern", org: "Virginia Commonwealth University", place: "Annandale, VA",
    points: [
      "Building a pipeline that fuses four cardiac MRI sequences (cine, T1, T2 and LGE) onto a 3D heart model for heart failure with preserved ejection fraction (HFpEF)",
      "Aligns sequences that each capture a different tissue change (motion, fibrosis, inflammation, scar) and outputs a parametric map scoring 16 heart segments against healthy references",
      "Benchmarking quantum preprocessing (QUBO scan selection, quantum Fourier transform) against the classical model already built",
    ] },
    { date: "2024-06", end: "2024-08", type: "research", title: "Research Intern", org: "George Mason University, ASSIP", place: "Fairfax, VA",
    points: [
      "Researched online algorithms for interval scheduling: models that learn from each reservation as it arrives instead of training on a full dataset at once, as offline scheduling systems do",
      "Engineered an online interval scheduling system in Django with a Python backend, HTML frontend and SQLite database, plus an admin side for editing rooms and reservations",
      "Designed a “follow-the-leader” algorithm that runs each request through three sub-algorithms (room popularity, density and current reservations) and weights their outputs to return the best available interval",
      "Built a baseline booking model that assigns non-overlapping reservations to maximize room utilization and participant satisfaction, then used it to generate training data for the online learning model",
      "Predicted the actual room placement for 93% of reservations",
      "Presented the research poster to George Mason University faculty at the Aspiring Scientists Summer Internship Program",
    ],
    doc: { img: "assets/research/Talreja_Arnav_2024ASSIP_Poster.jpg", pdf: "assets/research/Talreja_Arnav_2024ASSIP_Poster.pdf", label: "Talreja_Arnav_2024ASSIP_Poster.pdf" } },
    { date: "[2025]", type: "award", title: "3x Chesapeake State Finalist", org: "FIRST Tech Challenge", img: "assets/ftc/states-team.jpg",
    points: [
      "Reached the FIRST Chesapeake State Championship finals three times with FTC 14607 Robot Uprising",
      "Won the FTC State Motivate Award and the Regional Inspire Award twice",
    ] },
    { date: "2023-06", end: "Present", type: "tennis", title: "Varsity Captain & #1 Singles", org: "TJHSST Varsity Tennis · USTA Juniors", img: "assets/tennis/08-training-now-poster.jpg", imgPos: "50% 40%",
    points: [
      "Plays #1 singles on the varsity boys’ team all four years, with a 19-1 record",
      "Captains 20 players on and off the court; organizes off-season practices, fitness sessions and team bonding, and manages team finances",
      "Competes year-round in USTA junior tournaments, earning a 10 UTR (Universal Tennis Rating) and 4-star college recruit status",
      "Coaches younger players and strings racquets to fund USTA tournament and travel expenses",
    ] },
    { date: "2025-06", type: "award", title: "VHSL State Finalist", org: "Virginia High School League", place: "Newport News, VA",
    link: { label: "2025 VHSL state tennis results (Cardinal News)", href: "https://cardinalnews.org/2025/06/09/vhsl-state-tournament-schedule-for-tennis/" },
    points: [
      "Reached both 2025 VHSL Class 6 state finals: runner-up in singles, and runner-up in doubles with Jonah Treitler",
      "2x VHSL state semifinalist",
      "Named Washington Post All-Met in 2024 and 2025",
      "2x VHSL Class 6 All-State, 2x All-Region, 3x District Player of the Year and Varsity MVP",
    ] },
    { date: "[2017]", type: "tennis", title: "First tournament win", text: "My first win, celebrated with Farshad Garakani and Michael Harper, the two coaches who got me there.", img: "assets/tennis/04-first-win.jpg", imgPos: "50% 40%" },
    { date: "2022", type: "award", title: "Winner, Congressional App Challenge", org: "Rep. Don Beyer, VA-08", place: "Washington, D.C.", img: "assets/projects/hearthealth-house-of-code.jpg", imgPos: "55% 40%", yt: "CXremFhURvM",
    points: [
      "Started CPR/AED trainings at Longfellow Middle School after our neighbor Gwyneth went into cardiac arrest at school, where no one knew CPR",
      "Learned mobile app development during quarantine, when in-person trainings stopped, to scale CPR access to more communities",
      "Developed HeartHealth, a React Native/Expo cardiac emergency response app focused on CPR intervention",
      "Built the first online, crowdsourced AED database, letting users register AEDs with photos, access details and verification status",
      "Selected by Rep. Don Beyer as Virginia’s 8th District winner and presented the app at #HouseOfCode in Washington, D.C.",
      "Later rebuilt it from the ground up into CPR360, now free on the App Store",
    ],
      features: ["Hands-free CPR guidance with voice narration", "100 BPM compression metronome and CPR timer", "One-tap 911 and GPS alerts", "Crowdsourced AED map with Apple/Google Maps navigation", "Pediatric CPR modes and offline caching"],
      builtWith: "JavaScript, React Native, Expo",
      link: { label: "Our Congressional App Challenge page", href: "https://www.congressionalappchallenge.us/22-VA08/" } },
    { date: "2026", end: "Present", type: "project", title: "CPR360", org: "CPR coach & AED finder, on the App Store", img: "assets/projects/cpr360-hero.jpg",
    points: [
      "Rebuilt HeartHealth from the ground up into CPR360, a free iPhone and iPad app for the bystander who happens to be there when someone collapses, now live on the App Store",
      "Built an SOS CPR coach: a full-screen compression metronome with a calm voice that says what to do next, in Adult, Child and Infant modes, working with no signal and no account",
      "Added one-tap emergency alerts that text chosen contacts a pre-filled message with the rescuer’s location, then open the dialer for 911",
      "Grew the crowdsourced AED database into a map and list of nearby AEDs, cached for offline use, where users add AEDs with a live photo, tap “Still here” to keep pins current or report them missing, with a moderator check before anything goes live",
      "Created a short interactive 3D CPR lesson that shows compressions more clearly than standard 2D demonstrations, plus a five-step AED guide and a moderated community for sharing AED locations and local trainings",
    ],
    link: { label: "Download CPR360 on the App Store", href: "https://apps.apple.com/us/app/cpr360/id6797158944" } },
    { date: "2026", end: "Present", type: "project", title: "Hospital Price Transparency Platform", org: "Independent project",
    points: [
      "Built a breadth-first web crawler that finds and downloads Virginia hospitals’ machine-readable standard-charge files (45 CFR 180), parsing multi-GB CSV/JSON files",
      "Normalized ~9 million negotiated rates by CPT, HCPCS and MS-DRG code into a PostgreSQL database covering all 125 Virginia hospitals and 18,033 procedures",
      "Developed a website where patients search a procedure and compare real prices at nearby hospitals on an interactive map, with insurance-based out-of-pocket estimates",
      "Working with Rep. Don Beyer’s office on hospital compliance with price transparency law; expanding the pipeline to all 50 states",
    ],
    link: { label: "Open the platform", href: "https://atalreja777.github.io/virginia-hospital-price-transparency" } },
    { date: "2026-07", end: "Present", type: "project", title: "Augmented-Reality Glasses", org: "Hands-free hardware for AR PulseGuide",
    points: [
      "Fabricating my own augmented-reality glasses so AR PulseGuide runs hands-free, with both of the rescuer’s hands on the chest",
      "Display: a 0.49-inch OLED microdisplay beside each eye creates the image, and two achromatic lenses focus it so it looks sharp and far away instead of a blur inches from the eye",
      "Light guide: a clear guide with a reflecting prism catches that image at the edge of the lens and bends it into the eye, so the CPR guidance appears on top of the real world while the wearer still sees through the lens",
      "Alignment: each eye’s optics sit on a mount with a focus shim that sets the sharpness and a leaf spring that holds the light guide in place, so the overlay stays lined up with what the wearer sees",
      "Audio and control: a built-in microphone and audio let the rescuer call 911 hands-free and hear step-by-step instructions for hand placement and compression pace, while a processor on the front board drives both displays",
      "Applications beyond emergencies: immersive, high-stress simulations that prepare teachers and staff for a real cardiac arrest, and hands-on training that can replace passive CPR courses so the skills actually hold up when it counts",
    ],
    builtWith: "Onshape CAD, OLED microdisplays, light-guide optics",
    doc: { img: "assets/projects/ar-glasses-exploded.jpg", label: "Exploded view, rendered from the Onshape assembly", cta: "View full size", wide: true, alt: "Exploded view of the augmented-reality glasses: frame, optics, display mounts, electronics and temples" },
    media: [
      { src: "assets/projects/ar-glasses-assembled.jpg", contain: true, cap: "Assembled" },
      { src: "assets/projects/ar-glasses-optics.jpg", contain: true, cap: "Optics: light guides + lenses" },
      { src: "assets/projects/ar-glasses-inside.jpg", contain: true, cap: "Wearer’s view: displays and wiring" },
    ] },
    { date: "2026-01", end: "Present", type: "project", title: "AR PulseGuide", org: "Augmented-reality CPR trainer",
    points: [
      "Built an iPhone app that coaches CPR in real time with augmented reality: point the camera at someone lying on their back and it marks exactly where to check their pulse and place your hands, right on their body",
      "Recognizes a person lying on the floor and maps their body in 3D using the iPhone’s camera and depth sensor",
      "Keeps the markers accurate and steady on the body as the phone moves, even when a sensor reading is off",
      "Watches the rescuer’s hands in real time: the target turns green when they’re in the right spot, and pushing on the ribs or stomach triggers a red flash, a buzz and a spoken warning",
      "Corrects the rescuer as they go instead of teaching passively, guiding every step from checking if the person responds to giving compressions with a 3D arm showing where hands go and a metronome for the right pace, for an immersive, hands-on training experience",
      "Taking the project fully hands-free by fabricating my own augmented-reality glasses, so a rescuer keeps both hands on the chest instead of holding a phone",
    ],
    builtWith: "Swift, ARKit, RealityKit, Vision, AVFoundation",
    media: [
      { type: "youtube", id: "3WFJ5zvAqMk", vertical: true, tall: true, src: "assets/projects/arpulse-demo-1.jpg", cap: "Live demo: hand placement" },
      { type: "youtube", id: "sHqVI9XRK1o", vertical: true, tall: true, src: "assets/projects/arpulse-demo-2.jpg", cap: "Live demo: second subject" },
    ] },
    { date: "[2016]", type: "tennis", title: "Junior training", org: "Courtplay Athletics", text: "Started training with Courtplay Athletics alongside other junior players.", img: "assets/tennis/03-courtplay-squad.jpg", imgPos: "50% 45%" },
    { date: "2013-10", type: "tennis", title: "Picked up a racket", text: "First time on a tennis court, at age 3, with a racket almost as big as I was.", img: "assets/tennis/01-age-3.jpg", imgPos: "50% 58%" },
    { date: "2025-08", type: "gur", title: "First Summer Robotics Camp with AYM", org: "Growing Up with Robotics × AYM", img: "assets/gur/aymsummercampgroup.jpg",
    points: [
      "Ran a four-evening robotics camp with the youth group AYM for 45 middle schoolers from Virginia, Maryland and North Carolina",
      "Taught the engineering design process through one task: build a robot that drives itself through a maze",
      "Covered CAD, electronics and sensors, and programming, so 12 teams could design, build and code their own LEGO SPIKE robots for a final maze competition",
      "Gave campers skills that set them up to succeed on robotics teams and in STEM classes: planning before building, debugging step by step, and working as a team",
    ] },
    { date: "2023-10", end: "Present", type: "gur", title: "Community Outreach", org: "Growing Up with Robotics", place: "Northern Virginia and online",
    points: [
      "Runs LEGO and EV3 robot demos at STEAMOLOGY StemFest, reaching students from 91 schools",
      "Taught structural design and introduced FIRST programs to underserved students through INMED engineering challenges",
      "Hosted marshmallow-tower challenges, speed-CAD contests and block-coding demos at Durga Temple",
      "Helped Weyanoke Elementary start two FIRST LEGO League teams",
      "Teaches free online classes in CAD and robot programming to middle schoolers abroad, including in India",
    ] },
    { date: "2023-09", end: "Present", type: "gur", title: "Co-Founder & Co-President", org: "Growing Up with Robotics", place: "Fairfax, VA", img: "assets/gur/fllmentoring.jpg",
    points: [
      "Co-founded a student-run nonprofit that began with two high schoolers teaching CAD to one middle schooler",
      "Built GUR into a nonprofit to give our teaching a credible name, so we could reach out to professionals and sponsors and turn their support into free training, mentoring and resources for kids",
      "Teaches technical classes in CAD, programming and an engineering capstone",
      "Mentors FLL and FTC teams; matched 110 mentors with 7 teams",
      "Leads four free programs: 1-on-1 mentorship, team-to-team coaching from FLL to FRC, open courses and multi-day camps with schools and community centers",
    ] },
    { date: "2023-09", end: "2027-06", type: "school", title: "Student", org: "Thomas Jefferson High School for Science and Technology", place: "Alexandria, VA",
    points: [
      "Coursework: Artificial Intelligence 1 & 2, Multivariable Calculus, Linear Algebra, Quantum Mechanics & Electrodynamics, AP Physics C, AP Calculus BC, AP Computer Science",
      "Also: Design and Technology (CAD, circuitry), AP Macroeconomics, AP Microeconomics, Web Development, Mobile Applications",
    ] },
    { date: "2024-01", end: "Present", type: "club", title: "Vice President (Elected)", org: "Investment Club", place: "TJHSST",
    points: [
      "Teaches weekly lessons on investing and personal finance, from stock strategies to health plans, life insurance and corporate investments",
      "Prepares and coaches club teams for the Wharton and Ithaca high school investment competitions",
      "Competed on Virginia’s state-champion teams in both the National Economics Challenge (5th in the nation) and the National Personal Finance Challenge (national semifinalist)",
    ] },
    { date: "2024-09", end: "Present", type: "club", title: "Competition Coordinator", org: "Sports Statistics Club", place: "TJHSST",
    points: [
      "Introduces members to modern sports statistics models and how AI and machine learning analyze player and team performance",
      "Leads talks comparing algorithms’ strengths and limitations and the data trends that changed how sports are played",
      "Competes in and coaches teams for the Wharton Data Science Competition",
    ] },
    { date: "2025", type: "award", title: "Semifinalist, Top 25 of 5,000+ Teams", org: "Wharton High School Data Science Competition",
    points: [
      "Named a semifinalist in the 2025 Wharton High School Data Science Competition with a five-person TJ team",
      "Placed in the top 25 of 5,000+ teams worldwide, recognized by the Wharton Sports Analytics and Business Initiative and the Wharton Global Youth Program",
    ],
    media: [
      { src: "assets/awards/wharton-2025-semifinalist-talreja.jpg", contain: true, cap: "Individual semifinalist certificate" },
      { src: "assets/awards/wharton-2025-semifinalist-team.jpg", contain: true, cap: "Team semifinalist certificate" },
    ] },
    { date: "2026", type: "award", title: "National Finalist, Top 15", org: "Modeling the Future Challenge", place: "The Actuarial Foundation",
    points: [
      "Earned a national finalist prize award, top 15 in the country, in the 2025–26 Modeling the Future Challenge",
      "Investigated how likely U.S. correctional systems are to run out of safe capacity over the next 3, 5 and 10 years as admissions rebound after COVID, and which policies reduce that risk most cost-effectively",
      "Modeled how people enter and leave custody using 54 years of national data, then simulated thousands of possible futures to measure the risk",
      "Found overcrowding is close to certain without action, a 96% chance of exceeding capacity within a year, driven by everyday crowding rather than rare crises",
      "Showed that diverting people before admission is the most effective fix, cutting excess bed-days by more than half, and proposed financial safeguards that automatically add medical and staffing capacity during surges",
    ],
    doc: { img: "assets/research/Talreja_Arnav_2026MTFC_Paper.jpg", pdf: "assets/research/Talreja_Arnav_2026MTFC_Paper.pdf", label: "Beds & Balance: Mitigating the Risks of U.S. Prison Overcrowding", cta: "Read the paper", page: true, alt: "Cover page of the paper Beds & Balance: Mitigating the Risks of U.S. Prison Overcrowding" },
    link: { label: "Official finalists list", href: "https://www.mtfchallenge.org/finalists/" } },
    { date: "[2026]", type: "award", title: "Math & Computing Honors",
    points: [
      "USA Computing Olympiad, Gold Division",
      "2x AIME Qualifier",
      "Diamond Challenge Semifinalist",
    ] },
    { date: "2023-06", end: "Present", type: "work", title: "Website and Business Consultant", org: "Premier Cardiac & Vascular", place: "Annandale, VA",
    points: [
      "Provides website expertise to a clinic that promotes cardiac wellness and treats cardiovascular diseases",
    ] },
    { date: "2019-08", end: "Present", type: "service", title: "Northern VA Community Ambassador", org: "Gwyneth’s Gift Foundation", place: "McLean, VA",
    points: [
      "Organized the first CPR/AED trainings at Longfellow Middle School, making it the first HEARTSafe middle school in all of Fairfax County Public Schools",
      "Turned it into a yearly program: every Longfellow student now learns hands-only CPR and how to use an AED, more than 1,000 students every year",
      "Featured by FCPS in “Lifesaving Lessons Learned at Longfellow Middle School” for building awareness of Gwyneth’s story",
      "Expands the trainings beyond school to a local temple and community centers, because CPR is a lifesaving skill everyone should know; hosted a full-room community session at a local temple in September 2026",
      "Coordinates volunteers and teaches hands-on CPR alongside instructors, training 10,000+ community members with Gwyneth’s family and local fire departments",
      "Upcoming: expanding the Longfellow model to more FCPS middle schools, working with local officials to bring CPR/AED training to every middle school in the region",
    ],
    highlight: "In March 2025, three Longfellow eighth graders used the CPR they learned in these trainings to save a classmate’s father after he went into cardiac arrest on a Scouts trip. His chance of survival was about 5%, but because they started CPR in time, he is fine today.",
    link: { label: "Read the FCPS story", href: "https://longfellowms.fcps.edu/node/7369" },
    media: [
      { src: "assets/cpr/fcps-cpr-story.jpg", cap: "The three Longfellow eighth graders who saved a life with CPR (photo: FCPS)" },
      { src: "assets/cpr/longfellow-training.jpg", cap: "CPR training at Longfellow Middle School (photo: FCPS)" },
      { type: "video", src: "assets/cpr/temple-compressions.mp4", poster: "assets/cpr/temple-compressions-poster.jpg", cap: "Community CPR training at a local temple" },
      { src: "assets/cpr/temple-compressions.jpg", cap: "Everyone practicing hands-only CPR" },
      { src: "assets/cpr/temple-instructor-banner.jpg", cap: "Learning from a Gwyneth’s Gift instructor" },
      { src: "assets/cpr/temple-instructor.jpg", cap: "Hands-on coaching" },
    ] },
    { date: "2023-06", end: "Present", type: "service", title: "Northern Virginia President", org: "Second Serve", place: "Fairfax, VA",
    points: [
      "Leads the Northern Virginia chapter of a youth-led nonprofit that removes cost as a barrier to playing tennis",
      "Collects donations at USTA tournaments, rallying players and families to give racquets, shoes and balls",
      "Donates equipment to kids in underserved communities in the U.S. and abroad, and builds partnerships to expand access to tennis",
    ] },
    { date: "2022-06", end: "Present", type: "service", title: "Volunteer", org: "Durga Temple Free Clinic", place: "Lorton, VA",
    points: [
      "Serves a clinic providing free or low-cost blood tests, checkups and physician consultations to low-income and uninsured families",
      "Checks in patients, many of them elderly and without health insurance, and translates and interprets in Hindi and Spanish",
      "Collects donations to support the clinic",
    ] },
    { date: "2019", type: "robotics", title: "Team Member", org: "FIRST LEGO League", place: "Northern Virginia", img: "assets/fll/fll-match.jpg", imgPos: "50% 30%",
    points: [
      "Started FIRST LEGO League as a way to explore robots and how to program their behaviors",
      "Built, coded and ran LEGO robots through timed competition missions",
      "Learned the foundations of design, programming and teamwork later built on in FTC",
    ] },
    { date: "[2021]", type: "robotics", title: "Team Member", org: "FTC Team Infinite Overload", place: "Northern Virginia",
    points: [
      "Moved up from FIRST LEGO League to FIRST Tech Challenge with Team Infinite Overload, trading LEGO kits for metal parts, motors and real code",
      "Started designing and building mechanisms from scratch instead of following the instruction manuals I grew up with",
      "Learned to sketch an idea, prototype it, test it on the field and rebuild it until it worked",
      "Competed in FTC qualifiers with the team",
    ],
    media: [
      { src: "assets/early/infinite-overload.jpg", cap: "Team Infinite Overload with our robot and trophy" },
      { src: "assets/early/robotics-awards.jpg", cap: "Award day with the teams" },
    ] },
    { date: "2023-08", end: "Present", type: "robotics", title: "Captain", org: "FTC 14607 Robot Uprising", place: "TJHSST",
    points: [
      "Captain for the 2026–27 season, chosen by the captains after serving as Junior Captain (2025–26) and Lead Programmer (2024–25)",
      "Built and programmed the robot: computer vision-assisted autonomous routines, Fusion 360 assemblies, and servo wiring to the REV Control Hub",
      "Implemented RoadRunner motion planning with three-wheel dead-wheel odometry so the robot tracks its field position in real time and follows smooth, repeatable autonomous paths",
      "Architected a non-blocking finite-state machine framework that updates odometry, PIDF slide/arm controllers and five mechanism state machines in parallel, scoring while driving",
      "Programmed OpenCV/VisionPortal vision that finds game pieces with HSV/YCrCb color masks and contour fitting, plus AprilTag pose estimation to line up with goals",
      "Added one-button automated actions in driver-controlled play, cutting driver workload and making scoring faster and more consistent",
    ],
    media: [
      { type: "video", tall: true, src: "assets/ftc/odometry-hold.mp4", poster: "assets/ftc/odometry-hold-poster.jpg", cap: "Odometry: pushed off its mark, the robot drives back" },
    ] },
  ],


  /* ---------------------------------------------------------------------
     PROJECTS & RESEARCH — the index list. `img` shows on hover.
     category: Research | Engineering | Teaching | Software
     --------------------------------------------------------------------- */
  projects: [
    { title: "Cardiac MRI Tissue Map for Heart Failure (HFpEF)", category: "Research", year: "2025", text: "Building a pipeline that fuses four cardiac MRI sequences into a per-segment tissue map for heart failure (HFpEF), and benchmarking quantum preprocessing (QUBO scan selection, quantum Fourier transform) against classical methods.", img: "assets/projects/cardiac-mri-thumb.svg", credit: "T1 map: Cadour et al., J Cardiovasc Magn Reson 2023, CC BY 4.0", page: "cardiac-mri.html" },
    { title: "Stroke Risk from Carotid Ultrasound", category: "Research", year: "2026", text: "Designing an ultrasound pipeline at INOVA that combines a foundation model (USFM), MedSAM2 segmentation and attention-based multiple-instance learning to predict stroke risk.", img: "assets/projects/research-ultrasound.jpg", credit: "Image: Jain et al., J Cardiovasc Dev Dis 2022, CC BY 4.0", static: true },
    { title: "Endovascular Treatments for Limb-Threatening PAD", category: "Research", year: "2026", text: "Co-authored a study of four endovascular treatments for limb-threatening peripheral artery disease in 26,249 Medicare patients, submitted to the Journal of Vascular Surgery.", img: "assets/projects/research-pad.jpg", credit: "Image: Drquochoai, Wikimedia Commons, CC BY-SA 4.0", static: true },
    { title: "Carotid Endarterectomy vs. TCAR", category: "Research", year: "2026", text: "Co-authored a retrospective comparison of carotid endarterectomy and transcarotid artery revascularization using propensity score matching; under internal peer review.", img: "assets/projects/research-carotid.jpg", credit: "Image: Ed Uthman, MD, Wikimedia Commons, CC BY 2.0", static: true },
    { title: "Beds & Balance: Mitigating the Risks of U.S. Prison Overcrowding", category: "Research", year: "2026", text: "Modeling the Future Challenge national finalist: a stochastic model of prison overcrowding risk and the policies that reduce it.", img: "assets/research/mtfc-cover.jpg", credit: "Photo: California Department of Corrections, Mule Creek State Prison, public domain. Logo: The Actuarial Foundation", media: [{ src: "assets/research/mtfc-cover.jpg", cap: "Modeling the Future Challenge, national finalist" }, { src: "assets/research/mtfc-prison-crowding.jpg", cap: "Overcrowding at Mule Creek State Prison, California" }, { src: "assets/research/Talreja_Arnav_2026MTFC_Paper.jpg", cap: "Our paper" }], href: "assets/research/Talreja_Arnav_2026MTFC_Paper.pdf", linkLabel: "Read the full paper (PDF)",
      kicker: "Modeling the Future Challenge, national finalist", role: "",
      body: ["U.S. jail and prison admissions have rebounded since COVID and are growing faster than capacity. Our team asked how likely a correctional system is to exceed safe capacity over the next 3, 5 and 10 years, and which policies reduce that risk most cost-effectively."],
      points: ["Investigated how likely U.S. correctional systems are to run out of safe capacity over the next 3, 5 and 10 years as admissions rebound after COVID, and which policies reduce that risk most cost-effectively", "Modeled how people enter and leave custody using 54 years of national data, then simulated thousands of possible futures to measure the risk", "Found overcrowding is close to certain without action, a 96% chance of exceeding capacity within a year, driven by everyday crowding rather than rare crises", "Showed that diverting people before admission is the most effective fix, cutting excess bed-days by more than half, and proposed financial safeguards that automatically add medical and staffing capacity during surges"],
      details: [["Competition", "2025–26 Modeling the Future Challenge"], ["Result", "National finalist prize award, top 15"], ["Data", "Bureau of Justice Statistics, Vera Institute incarceration trends, Census, FRED"]] },
    { title: "Online Interval Scheduling with Online Algorithms", category: "Research", year: "2024", text: "George Mason ASSIP: a Django scheduling system whose online model placed 93% of reservations correctly.", img: "assets/research/Talreja_Arnav_2024ASSIP_Poster.jpg", href: "assets/research/Talreja_Arnav_2024ASSIP_Poster.pdf", linkLabel: "View the poster (PDF)",
      role: "Research Intern",
      points: [
        "Researched online algorithms for interval scheduling, which learn from each reservation as it arrives instead of training on a full dataset at once",
        "Engineered the system in Django with a Python backend, HTML frontend and SQLite database, plus an admin side for editing rooms and reservations",
        "Designed a “follow-the-leader” algorithm that weights three sub-algorithms (room popularity, density and current reservations) to return the best interval",
        "Built a baseline booking model that assigns non-overlapping reservations to maximize utilization and satisfaction, generating training data for the online model",
        "Predicted the actual room placement for 93% of reservations",
        "Presented the research poster to George Mason University faculty",
      ],
      body: ["Modern scheduling systems use offline algorithms that need the whole dataset up front, which wastes time for both clients and administrators. Our team built an online system that gets better with every request."],
      details: [["Program", "Aspiring Scientists Summer Internship Program, Department of Computer Science, George Mason University"], ["Built with", "Python, Django, HTML, SQLite"]] },
    { title: "Hospital Price Transparency Platform", category: "Software", year: "2026", text: "~9 million negotiated prices across all 125 Virginia hospitals, searchable on a map.", badge: "Working with Rep. Don Beyer’s office on hospital price transparency", img: "assets/projects/hospital-price-platform.jpg", href: "https://atalreja777.github.io/virginia-hospital-price-transparency", external: true },
    { title: "AR PulseGuide", category: "Software", year: "2026", text: "A real-time augmented-reality CPR trainer that corrects your hands as you practice, instead of teaching passively.", img: "assets/projects/arpulse-demo-1.jpg", href: null,
      kicker: "Augmented-reality CPR trainer", role: "Creator",
      body: ["Most people freeze during a cardiac arrest because they are unsure where to put their hands. AR PulseGuide points a phone at a person lying down, finds their body, and shows exactly where each step happens, then grades the rescuer’s real hands in real time."],
      points: [
        "Built an iPhone app that coaches CPR in real time with augmented reality: point the camera at someone lying on their back and it marks exactly where to check their pulse and place your hands, right on their body",
        "Recognizes a person lying on the floor and maps their body in 3D using the iPhone’s camera and depth sensor",
        "Keeps the markers accurate and steady on the body as the phone moves, even when a sensor reading is off",
        "Watches the rescuer’s hands in real time: the target turns green when they’re in the right spot, and pushing on the ribs or stomach triggers a red flash, a buzz and a spoken warning",
        "Corrects the rescuer as they go instead of teaching passively, guiding every step from checking if the person responds to giving compressions with a 3D arm showing where hands go and a metronome for the right pace, for an immersive, hands-on training experience",
        "Taking the project fully hands-free by fabricating my own augmented-reality glasses, so a rescuer keeps both hands on the chest instead of holding a phone",
      ],
      details: [["Built with", "Swift, ARKit, RealityKit, Vision, AVFoundation"], ["Hardware", "LiDAR iPhone or iPad"], ["Guidelines", "Checked against the AHA 2025 guidelines: 100–120 compressions per minute, 5–6 cm depth"], ["Next", "Fabricating my own AR glasses for fully hands-free guidance"]],
      media: [
        { type: "youtube", id: "3WFJ5zvAqMk", vertical: true, src: "assets/projects/arpulse-demo-1.jpg", cap: "Live demo: hand placement" },
        { type: "youtube", id: "sHqVI9XRK1o", vertical: true, src: "assets/projects/arpulse-demo-2.jpg", cap: "Live demo: second subject" },
        { src: "assets/projects/ar-glasses-exploded.jpg", cap: "Next: my own AR glasses, exploded view" },
        { src: "assets/projects/ar-glasses-assembled.jpg", cap: "My AR glasses, assembled" },
      ] },
    { title: "FTC Robot Software", category: "Engineering", year: "2025", text: "RoadRunner motion planning, a finite-state machine framework and OpenCV vision for FTC 14607.", img: "assets/ftc/robot-lab.jpg", href: null },
    { title: "GUR open curriculum", category: "Teaching", year: "2024", text: "Free courses in CAD, Python, C++ and embedded systems, taught by students for students.", img: "assets/gur/aymsummercamp.jpg", href: "https://www.growingupwithrobotics.org/" },
    { title: "Robotics Camp curriculum", category: "Teaching", year: "2025", text: "A four-day camp for middle schoolers built around one goal: a robot that solves a maze. Students learn the engineering design process, CAD, sensors and circuits, and programming with LEGO SPIKE kits, then compete with their Mazebots on the last day.", img: "assets/gur/img_6799.jpg", href: null },
    { title: "CPR360", category: "Software", year: "2026", text: "HeartHealth, rebuilt from the ground up: a CPR coach and AED finder for whoever is there when someone collapses. Free on the App Store.", img: "assets/projects/cpr360-hero.jpg", href: "https://apps.apple.com/us/app/cpr360/id6797158944", external: true },
    { title: "HeartHealth", category: "Software", year: "2022", text: "A CPR app born in quarantine. Winner of Rep. Don Beyer’s 2022 Congressional App Challenge (VA-08).", img: "assets/projects/hearthealth-house-of-code.jpg", href: "https://www.congressionalappchallenge.us/22-VA08/", linkLabel: "See our Congressional App Challenge winner page", yt: "CXremFhURvM",
      role: "", kicker: "Congressional App Challenge winner",
      body: [
        "The why: when Gwyneth, my neighbor, went into cardiac arrest at school, no one knew CPR, and she suffered a fatal anoxic brain injury. My family did not want her story to repeat itself, and that is why I started running CPR and AED trainings at Longfellow Middle School.",
        "Then quarantine hit and the trainings stopped. Even though I couldn’t hold them in person, it opened up new paths: the chance to scale my audience to more communities through new methods. I used that time to teach myself mobile app development in JavaScript and React.",
        "HeartHealth was the result: a rudimentary app with a focus on CPR intervention, built around an open-source AED database, an emergency CPR walkthrough, and a CPR education platform.",
        "Rep. Don Beyer selected HeartHealth as the winner of his 2022 Congressional App Challenge for Virginia’s 8th District, and we presented it at #HouseOfCode in Washington, D.C., answering questions about the app’s purpose, how I picked up app development in quarantine, and how we built it in React.",
        "I have since rebuilt HeartHealth from the ground up into CPR360, now free on the App Store.",
      ],
      features: ["Open-source AED database", "Emergency CPR walkthrough", "CPR education platform"],
      builtWith: "JavaScript, React",
      details: [["Award", "Winner, 2022 Congressional App Challenge (VA-08)"], ["Selected by", "Rep. Don Beyer"], ["Shown at", "#HouseOfCode, Washington, D.C."], ["Today", "Rebuilt as CPR360, now on the App Store"]] },
  ],
};
