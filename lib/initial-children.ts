export interface InitialChildData {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date string
  dream: string;
  imageUrl: string;
  summary: string;
  story: string;
}

// Compute date of birth from age
const birthDateForAge = (age: number): string => {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  return `${birthYear}-01-15T00:00:00.000Z`;
};

export const INITIAL_CHILDREN: InitialChildData[] = [
  {
    id: "matambi-shakira",
    firstName: "Shakira",
    lastName: "Matambi",
    dateOfBirth: birthDateForAge(17),
    dream: "Makeup Artist",
    imageUrl: "/Matambi.png",
    summary: "Shakira is the youngest of three children and lives with her mother, who works as a security guard to support the family.",
    story: "Shakira is the youngest of three children and lives with her mother, who works as a security guard to provide for the family. A Senior 4 student at Sainte Marie Reine, Shakira has a real flair for beauty and salon arts, and dreams of training as a professional makeup artist. With your sponsorship, Shakira receives school fees and supplies, health insurance, nutritious meals, and ongoing mentorship — the support she needs to turn her talent into a thriving career."
  },
  {
    id: "aliane-cyuzuzo",
    firstName: "Aliane",
    lastName: "Cyuzuzo",
    dateOfBirth: birthDateForAge(18),
    dream: "Business Woman",
    imageUrl: "/Aliane.png",
    summary: "Aliane lives with her father and stepmother in a household of seven children, supported by her father's part-time work.",
    story: "Aliane lives with her father and stepmother in a busy household of seven children, supported by her father's part-time work. She's a Senior 5 student in the MCE combination at ES Rugabano, with a clear ambition to become a successful businesswoman one day. Music is her joy — she loves to sing and is rarely without a song playing nearby. Through sponsorship, Aliane receives school fees and supplies, health insurance, nutritious meals, and mentorship to help her build the future she's working toward."
  },
  {
    id: "louange-igihozo",
    firstName: "Louange",
    lastName: "Igihozo",
    dateOfBirth: birthDateForAge(11),
    dream: "Soldier",
    imageUrl: "/Louange.png",
    summary: "Louange is the youngest of three children and lives with both of her parents.",
    story: "Louange is the youngest of three children and lives with both of her parents. She's in Primary 6 at EP Ntwali, working hard to prepare for her national examination this year. Outside the classroom, she loves art and craft, and she's set her sights on a bold dream — becoming a soldier when she grows up. Sponsorship supports Louange with school fees and supplies, health insurance, nutritious meals, and mentorship as she works toward this important exam and beyond."
  },
  {
    id: "chancerine-izuwayo",
    firstName: "Chanceline",
    lastName: "Izuwayo",
    dateOfBirth: birthDateForAge(16),
    dream: "Company Manager",
    imageUrl: "/Chanceline.png",
    summary: "Chanceline is the youngest of five children and lives with her mother, who works on other people's farms to provide for the family.",
    story: "Chanceline is the youngest of five children and lives with her mother, who works on other people's farms to provide for the family. She's in Primary 5 at GS Cyivugiza and has a gift for art and craft, especially weaving. Chanceline dreams big — she wants to become a company manager when she grows up. Sponsorship provides Chanceline with school fees and supplies, health insurance, nutritious meals, and mentorship to help her build the skills she'll need to lead."
  },
  {
    id: "radju-kwizera",
    firstName: "Radju Foranny",
    lastName: "Kwizera",
    dateOfBirth: birthDateForAge(15),
    dream: "Football Player",
    imageUrl: "/Raju.png",
    summary: "Radju is one of five children. He lost his mother four years ago and now lives with his father and grandmother.",
    story: "Radju is one of five children. He lost his mother four years ago and now lives with his father and grandmother, who works part-time jobs to keep the family afloat. He's in Primary 6 at GS Cyivugiza, preparing for his national examination, and his favorite way to unwind is on the football pitch — he dreams of becoming a professional football player. Sponsorship supports Radju with school fees and supplies, health insurance, nutritious meals, and mentorship through this important exam year."
  },
  {
    id: "raoul-mugisha",
    firstName: "Raoul",
    lastName: "Mugisha",
    dateOfBirth: birthDateForAge(18),
    dream: "Electrical Engineer",
    imageUrl: "/Raoul.png",
    summary: "Raoul is one of seven children and lives with both of his parents, with his father taking on part-time work.",
    story: "Raoul is one of seven children and lives with both of his parents, with his father taking on part-time work to support the family. He's in Level 3, studying Electrical Technology at GS Akumunigo TSS, and is determined to become an electrical engineer. Music runs through him too — he loves playing the drums in his free time. Sponsorship helps Raoul with school fees and supplies, health insurance, nutritious meals, and mentorship as he trains for his future career."
  },
  {
    id: "beline-niyonkuru",
    firstName: "Beline",
    lastName: "Niyonkuru",
    dateOfBirth: birthDateForAge(18),
    dream: "Bank Manager",
    imageUrl: "/Beline.png",
    summary: "Beline is the youngest of four children and lives with both of her parents, who work part-time jobs.",
    story: "Beline is the youngest of four children and lives with both of her parents, who work part-time jobs to support the family. She's a Senior 5 student in the Math-Economics-Geography (MEG) combination at Sainte Marie Reine, with her sights set on a career as a bank manager. Outside her studies, Beline loves traditional dance and the culture behind it. Sponsorship gives Beline school fees and supplies, health insurance, nutritious meals, and mentorship as she works toward a future in finance."
  },
  {
    id: "yvan-rucogoza",
    firstName: "Yvan",
    lastName: "Rucogoza",
    dateOfBirth: birthDateForAge(18),
    dream: "Traditional Dancer",
    imageUrl: "/Yvan.png",
    summary: "Yvan lives with both of his parents in a family of seven children. His father works as a security guard.",
    story: "Yvan lives with both of his parents in a family of seven children. His father works as a security guard at a bank to provide for everyone. At Auto Ecole Ste Famille VTC, Yvan is training in Level 3 Mechanics, building practical skills for his future career. He's also a gifted traditional dancer and lights up whenever there's a chance to perform. Sponsorship supports Yvan with school fees, school supplies, health insurance, nutritious meals, and mentorship as he completes his technical training."
  },
  {
    id: "kezy-cezar",
    firstName: "Kenny Cezar",
    lastName: "Uwiragiye",
    dateOfBirth: birthDateForAge(13),
    dream: "Judge",
    imageUrl: "/Cesar.png",
    summary: "Kenny Cezar lives with his mother in a family of seven children.",
    story: "Kenny Cezar lives with his mother in a family of seven children. He's in Primary 6 at GS Cyivugiza, preparing for his national examination, and has set his heart on becoming a judge one day. Traditional dance is his favorite way to spend free time, and he rarely misses a chance to perform. Sponsorship gives Kenny Cezar school fees, school supplies, health insurance, nutritious meals, and mentorship through this critical exam year."
  },
  {
    id: "assouman-tugerageze",
    firstName: "Assouman",
    lastName: "Tugerageze",
    dateOfBirth: birthDateForAge(15),
    dream: "Football Player",
    imageUrl: "/Assouman.png",
    summary: "Assouman lives with both of his parents in a family of five children. His mother works as a cook at the Reclaim Hope Rwanda Center.",
    story: "Assouman lives with both of his parents in a family of five children. His mother works as a cook at the Reclaim Hope Rwanda Center. He's in Primary 5 at GS Cyivugiza and is an active member of his school's football club, where his passion for the game truly shows. Assouman dreams of becoming a professional football player. Sponsorship provides Assouman with school fees, school supplies, health insurance, nutritious meals, and mentorship to help him chase that dream."
  },
  {
    id: "chance-umuhire",
    firstName: "Chance",
    lastName: "Umuhire",
    dateOfBirth: birthDateForAge(17),
    dream: "Hotel Manager",
    imageUrl: "/Chance.png",
    summary: "Chance is the eldest of three children and lives with her mother, who takes on part-time work to support the family.",
    story: "Chance is the eldest of three children and lives with her mother, who takes on part-time work to support the family. She's a Senior 5 student in the Languages (LFK) combination at GS Shyogwe, with a warm, people-first personality that shows in everything she does. Chance dreams of becoming a hotel manager. Sponsorship gives Chance school fees, school supplies, health insurance, nutritious meals, and mentorship as she finishes secondary school."
  },
  {
    id: "samuel-umurerwa",
    firstName: "Samuel",
    lastName: "Umurerwa",
    dateOfBirth: birthDateForAge(16),
    dream: "Software Developer",
    imageUrl: "/Samuel.png",
    summary: "Samuel lives with both of his parents and siblings, working diligently towards a career in technology.",
    story: "Samuel lives with both of his parents, who do part-time work to support the family. He and his two siblings have faced real loss together, but they've remained close. Samuel is in Senior 3 at GS Cyivugiza, preparing for his national examination, with a clear goal in mind — he wants to become a software developer. Sponsorship gives Samuel school fees, school supplies, health insurance, nutritious meals, and mentorship as he works toward that goal."
  },
  {
    id: "sharapova-umwari",
    firstName: "Sharapova",
    lastName: "Umwari",
    dateOfBirth: birthDateForAge(10),
    dream: "Pilot",
    imageUrl: "/Sharapova.png",
    summary: "Sharapova is the youngest of five children and loves modern dance.",
    story: "Sharapova is the youngest of five children. She lost her mother four years ago and now lives with her father and grandmother, supported by her father's part-time work. She's in Primary 3 at EP Gitega, and dance is where she truly shines — modern dance is her favorite. Sharapova has a big dream: she wants to become a pilot. Sponsorship gives Sharapova school fees, school supplies, health insurance, nutritious meals, and mentorship as she pursues that dream."
  },
  {
    id: "betty-usanase",
    firstName: "Betty",
    lastName: "Usanase",
    dateOfBirth: birthDateForAge(16),
    dream: "Makeup Artist",
    imageUrl: "/Betty.png",
    summary: "Betty is the youngest of four children and lives with both of her parents.",
    story: "Betty is the youngest of four children and lives with both of her parents, who do part-time work to provide for the family. She's a Senior 4 student in the MS2 combination at Ecole Sainte Bernadette, and her passion lies in beauty — she loves doing makeup for others and dreams of becoming a professional makeup artist. Sponsorship gives Betty school fees, school supplies, health insurance, nutritious meals, and mentorship as she builds toward that career."
  },
  {
    id: "ornella-usanase",
    firstName: "Ornella",
    lastName: "Usanase",
    dateOfBirth: birthDateForAge(9),
    dream: "Soldier",
    imageUrl: "/Ornella.png",
    summary: "Ornella lives with both of her parents in a family of seven children.",
    story: "Ornella lives with both of his parents in a family of seven children, supported by her parents' part-time work. She's in Primary 4 at GS Cyivugiza, and loves nothing more than playing with her friends after school. Ornella has a bold ambition — she wants to become a soldier when she grows up. Sponsorship gives Ornella school fees, school supplies, health insurance, nutritious meals, and mentorship to support her along the way."
  },
  {
    id: "kennedy-uwimana",
    firstName: "Ganza Kennedy",
    lastName: "Uwimana",
    dateOfBirth: birthDateForAge(8),
    dream: "Soldier",
    imageUrl: "/Kennedy.png",
    summary: "Ganza is the eldest of two children. His mother works as a cleaner at the Reclaim Hope Rwanda Center.",
    story: "Ganza is the eldest of two children and lives with both of his parents. His mother works as a cleaner at the Reclaim Hope Rwanda Center. He's in Primary 3 at GS Cyivugiza, and football is his favorite pastime. Ganza dreams of becoming a soldier when he grows up. Sponsorship gives Ganza school fees, school supplies, health insurance, nutritious meals, and mentorship to support his education."
  },
  {
    id: "innocent-uwimana",
    firstName: "Innocent",
    lastName: "Uwimana",
    dateOfBirth: birthDateForAge(18),
    dream: "Football Player",
    imageUrl: "/Innocent.png",
    summary: "Innocent is training in Level 3 Mechanics and is passionate about football.",
    story: "Innocent is one of six children. Both of his parents have passed away, and he is now cared for by a guardian. He is training in Level 3 Mechanics at Auto Ecole Ste Famille VTC, building hands-on skills for his future, and football is where he loves to spend his free time. Sponsorship gives Innocent school fees, school supplies, health insurance, nutritious meals, and mentorship as he completes his training."
  },
  {
    id: "baptiste-uwituze",
    firstName: "Jean Baptiste",
    lastName: "Uwituze",
    dateOfBirth: birthDateForAge(13),
    dream: "Football Player",
    imageUrl: "/Baptise.png",
    summary: "Jean Baptiste lives with both of his parents and loves football.",
    story: "Jean Baptiste lives with both of his parents in a family of three children, supported by his parents' part-time work. He's in Senior 1 at GS Cyivugiza, and football is at the center of his world — he dreams of becoming a professional football player. Sponsorship gives Jean Baptiste school fees, school supplies, health insurance, nutritious meals, and mentorship as he begins secondary school."
  },
  {
    id: "fabienne-munezero",
    firstName: "Fabienne",
    lastName: "Munezero",
    dateOfBirth: birthDateForAge(8),
    dream: "Teacher",
    imageUrl: "/Munezero.png",
    summary: "Fabienne is the youngest of five children. Her mother works as a cook at the Reclaim Hope Rwanda Center.",
    story: "Fabienne is the youngest of five children and lives with both of her parents. Her mother works as a cook at the Reclaim Hope Rwanda Center. A Primary 4 student at EP Ntwali, Fabienne lights up whenever modern dance music comes on — it's her favorite way to express herself. She dreams of becoming a teacher when she grows up. Sponsorship provides Fabienne with school fees and supplies, health insurance, nutritious meals, and mentorship to support her education."
  }
];
