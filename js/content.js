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
    portrait: null, // e.g. "assets/me/portrait.jpg"
    // Big photo at the top of the page.
    // Rotating photos at the top of the page, first one shows on load.
    // pos is the crop focus ("x% y%") when the photo is wider or taller than the frame.
    heroSlides: [
      { src: "assets/ftc/states-team.jpg", cap: "FTC 14607 Robot Uprising at the Chesapeake State Championship", pos: "50% 35%" },
      { src: "assets/tennis/04-first-win.jpg", cap: "My first tournament win, with coaches Farshad Garakani and Michael Harper", pos: "55% 35%" },
      { src: "assets/econ/va-state-champions.jpg", cap: "Virginia State Champions, National Economics Challenge", pos: "45% 60%" },
      { src: "assets/projects/hearthealth-house-of-code.jpg", cap: "Presenting HeartHealth at #HouseOfCode in Washington, D.C.", pos: "55% 40%" },
      { src: "assets/cpr/temple-compressions.jpg", cap: "Hands-only CPR training with Gwyneth’s Gift", pos: "50% 60%" },
      { src: "assets/projects/ar-glasses-assembled.jpg", cap: "The AR glasses I’m building for AR PulseGuide", fit: "contain" },
      { src: "assets/fll/fll-team.jpg", cap: "Where it started: FIRST LEGO League", pos: "50% 40%" },
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
        "[Add what you do week to week: running camps, training mentors, fundraising, partnerships]",
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
      summary: "Medical machine learning and imaging research on stroke risk, heart failure and vascular treatment outcomes, building on algorithms research at George Mason University.",
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
      { when: "Now", title: "Still on court", text: "Varsity captain and #1 singles at TJ, with a 10 UTR and 4-star recruit status.", video: "assets/tennis/08-training-now.mp4", src: "assets/tennis/08-training-now-poster.jpg" },
    ],
  },

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
      "Builds HeartHealth, AR PulseGuide and the Hospital Price Transparency Platform",
    ] },
    { date: "2026-05", type: "award", title: "National Finalist, 5th Place", org: "National Economics Challenge", place: "Atlanta, GA",
    points: [
      "Represented Virginia at the national finals in the Adam Smith Division",
      "Placed 5th in the nation",
    ],
    link: { label: "2026 national finalists (Council for Economic Education)", href: "https://www.councilforeconed.org/congratulations-to-our-2026-national-economic-challenge-finalists/" } },
    { date: "2026-04", type: "award", title: "Virginia State Champion", org: "National Economics Challenge", place: "Federal Reserve Bank of Richmond", img: "assets/econ/va-state-champions.jpg", imgPos: "45% 60%",
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
    { date: "2026-08", type: "gur", title: "Robotics Camp 2", org: "Growing Up with Robotics", text: "[Add details about this camp: where, how many students, what they built.]", img: "assets/gur/img_6811.jpg" },
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
    { date: "2025", type: "award", title: "VHSL State Finalist", org: "Virginia High School League", place: "Virginia",
    points: [
      "Reached the 2025 VHSL state final; 2x VHSL state semifinalist",
      "Named Washington Post All-Met in 2024 and 2025",
      "2x VHSL Class 6 All-State, 2x All-Region, 3x District Player of the Year and Varsity MVP",
    ] },
    { date: "[2017]", type: "tennis", title: "First tournament win", text: "My first win, celebrated with Farshad Garakani and Michael Harper, the two coaches who got me there.", img: "assets/tennis/04-first-win.jpg", imgPos: "50% 40%" },
    { date: "2022", type: "award", title: "Winner, Congressional App Challenge", org: "Rep. Don Beyer, VA-08", place: "Washington, D.C.", img: "assets/projects/hearthealth-house-of-code.jpg", imgPos: "55% 40%", yt: "CXremFhURvM",
    points: [
      "Started CPR/AED trainings at Longfellow Middle School after a neighbor’s preventable death from a delayed cardiac arrest response",
      "Learned mobile app development during quarantine, when in-person trainings stopped, to scale CPR access to more communities",
      "Developed HeartHealth, a React Native/Expo cardiac emergency response app focused on CPR intervention",
      "Built the first online, crowdsourced AED database, letting users register AEDs with photos, access details and verification status",
      "Selected by Rep. Don Beyer as Virginia’s 8th District winner and presented the app at #HouseOfCode in Washington, D.C.",
    ],
      features: ["Hands-free CPR guidance with voice narration", "100 BPM compression metronome and CPR timer", "One-tap 911 and GPS alerts", "Crowdsourced AED map with Apple/Google Maps navigation", "Pediatric CPR modes and offline caching"],
      builtWith: "JavaScript, React Native, Expo",
      link: { label: "Our Congressional App Challenge page", href: "https://www.congressionalappchallenge.us/22-VA08/" } },
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
    { date: "2025-08", type: "gur", title: "First GUR summer camp", org: "Growing Up with Robotics", text: "[Camp details: where, how many students.]", img: "assets/gur/aymsummercampgroup.jpg" },
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
      "Turned it into a yearly program: every Longfellow student now learns hands-only CPR and how to use an AED, including a record 1,000 students in a single year",
      "Expands the trainings beyond school to a local temple and community centers, because CPR is a lifesaving skill everyone should know; hosted a full-room community session at a local temple in September 2026",
      "Coordinates volunteers and teaches hands-on CPR alongside instructors, reaching 7,000+ students",
      "Upcoming: expanding the Longfellow model to more FCPS middle schools, working with local officials to bring CPR/AED training to every middle school in the region",
    ],
    highlight: "In March 2025, three Longfellow eighth graders used the CPR they learned in these trainings to save a classmate’s father after he went into cardiac arrest on a Scouts trip. His chance of survival was about 5%, but because they started CPR in time, he is fine today.",
    link: { label: "Read the FCPS story", href: "https://longfellowms.fcps.edu/node/7369" },
    media: [
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
    { title: "Endovascular Treatments for Limb-Threatening PAD", category: "Research", year: "2026", text: "Co-authored study of 26,249 Medicare patients, submitted to the Journal of Vascular Surgery.", img: null, href: null },
    { title: "Beds & Balance: Mitigating the Risks of U.S. Prison Overcrowding", category: "Research", year: "2026", text: "Modeling the Future Challenge national finalist: a stochastic model of prison overcrowding risk and the policies that reduce it.", img: "assets/research/Talreja_Arnav_2026MTFC_Paper.jpg", href: "assets/research/Talreja_Arnav_2026MTFC_Paper.pdf", linkLabel: "Read the full paper (PDF)",
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
    { title: "Hospital Price Transparency Platform", category: "Software", year: "2026", text: "~9 million negotiated prices across all 125 Virginia hospitals, searchable on a map.", img: null, href: "https://atalreja777.github.io/virginia-hospital-price-transparency", linkLabel: "Open the platform" },
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
    { title: "Robotics Camp curriculum", category: "Teaching", year: "2025", text: "[Multi-day camp program: what students build by the end.]", img: "assets/gur/img_6799.jpg", href: null },
    { title: "HeartHealth", category: "Software", year: "2022", text: "A CPR app born in quarantine. Winner of Rep. Don Beyer’s 2022 Congressional App Challenge (VA-08).", img: "assets/projects/hearthealth-house-of-code.jpg", href: "https://www.congressionalappchallenge.us/22-VA08/", linkLabel: "See our Congressional App Challenge winner page", yt: "CXremFhURvM",
      role: "", kicker: "Congressional App Challenge winner",
      body: [
        "The why: a neighbor of ours died after a cardiac arrest because emergency help came too late. Her death was preventable with proper CPR and an AED nearby, and that is why I started running CPR and AED trainings at Longfellow Middle School.",
        "Then quarantine hit and the trainings stopped. Even though I couldn’t hold them in person, it opened up new paths: the chance to scale my audience to more communities through new methods. I used that time to teach myself mobile app development in JavaScript and React.",
        "HeartHealth was the result: a rudimentary app with a focus on CPR intervention, built around an open-source AED database, an emergency CPR walkthrough, and a CPR education platform.",
        "Rep. Don Beyer selected HeartHealth as the winner of his 2022 Congressional App Challenge for Virginia’s 8th District, and we presented it at #HouseOfCode in Washington, D.C., answering questions about the app’s purpose, how I picked up app development in quarantine, and how we built it in React.",
      ],
      features: ["Open-source AED database", "Emergency CPR walkthrough", "CPR education platform"],
      builtWith: "JavaScript, React",
      details: [["Award", "Winner, 2022 Congressional App Challenge (VA-08)"], ["Selected by", "Rep. Don Beyer"], ["Shown at", "#HouseOfCode, Washington, D.C."]] },
  ],
};
