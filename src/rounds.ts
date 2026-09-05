import { Round } from './types';

/**
 * The Two Truths content database.
 *
 * Each round has exactly three statements, exactly one of which is the lie
 * (`isLie: true`). Rounds are grouped by category for easier review and
 * expansion. `ALL_ROUNDS` flattens everything for the game to consume.
 *
 * ACCURACY NOTE: In a "spot the lie" game every truth must be genuinely true
 * and every lie genuinely false. The lies below are mostly well-documented
 * popular myths (things widely believed but false). If you add your own,
 * double-check the facts, wrong "facts" break player trust fast.
 */

const SPACE: Round[] = [
  {
    id: 'space-1',
    topic: 'Outer Space',
    statements: [
      { text: 'A day on Venus is longer than a year on Venus.', isLie: false },
      { text: 'The Sun makes up more than 99% of the mass of the solar system.', isLie: false },
      { text: 'Sound travels through the vacuum of space as a low hum.', isLie: true },
    ],
  },
  {
    id: 'space-2',
    topic: 'Outer Space',
    statements: [
      { text: 'Neutron stars can spin hundreds of times per second.', isLie: false },
      { text: 'There are more stars in the observable universe than grains of sand on Earth.', isLie: false },
      { text: 'The Moon has its own permanent source of light.', isLie: true },
    ],
  },
  {
    id: 'space-3',
    topic: 'Outer Space',
    statements: [
      { text: 'Jupiter is the largest planet in our solar system.', isLie: false },
      { text: 'Space is completely silent because there is no air to carry sound.', isLie: false },
      { text: 'The North Star, Polaris, is the brightest star in the night sky.', isLie: true },
    ],
  },
  {
    id: 'space-4',
    topic: 'Outer Space',
    statements: [
      { text: 'Saturn is the least dense planet and would float in water if you had a big enough tub.', isLie: false },
      { text: 'A year on Mercury is just 88 Earth days.', isLie: false },
      { text: 'Mars appears red because its surface is covered in frozen water.', isLie: true },
    ],
  },
  {
    id: 'space-5',
    topic: 'Outer Space',
    statements: [
      { text: 'Light from the Sun takes about 8 minutes to reach Earth.', isLie: false },
      { text: 'Olympus Mons on Mars is the tallest known volcano in the solar system.', isLie: false },
      { text: 'The Sun is a solid ball of burning rock.', isLie: true },
    ],
  },
  {
    id: 'space-6',
    topic: 'Outer Space',
    statements: [
      { text: 'Astronauts can grow slightly taller in space as their spines lengthen.', isLie: false },
      { text: 'Neptune was discovered through mathematical prediction before being seen.', isLie: false },
      { text: 'Every planet in the solar system has at least one moon.', isLie: true },
    ],
  },
  {
    id: 'space-7',
    topic: 'Outer Space',
    statements: [
      { text: 'The largest volcano and canyon in the solar system are both on Mars.', isLie: false },
      { text: 'Pluto was reclassified as a dwarf planet in 2006.', isLie: false },
      { text: 'The Sun is expected to burn out within the next thousand years.', isLie: true },
    ],
  },
  {
    id: 'space-8',
    topic: 'Outer Space',
    statements: [
      { text: 'The gas giants are Jupiter, Saturn, Uranus, and Neptune.', isLie: false },
      { text: 'A light-year measures distance, not time.', isLie: false },
      { text: 'The Moon is larger than the planet Mercury.', isLie: true },
    ],
  },
];

const ANIMALS: Round[] = [
  {
    id: 'animals-1',
    topic: 'Animals',
    statements: [
      { text: 'Octopuses have three hearts.', isLie: false },
      { text: 'A group of flamingos is called a flamboyance.', isLie: false },
      { text: 'Goldfish have a memory span of only three seconds.', isLie: true },
    ],
  },
  {
    id: 'animals-2',
    topic: 'Animals',
    statements: [
      { text: 'A shrimp\u2019s heart is located in its head.', isLie: false },
      { text: 'Cows have best friends and get stressed when separated.', isLie: false },
      { text: 'Bats are blind and rely only on echolocation.', isLie: true },
    ],
  },
  {
    id: 'animals-3',
    topic: 'Animals',
    statements: [
      { text: 'A snail can sleep for up to three years.', isLie: false },
      { text: 'Honeybees can recognize human faces.', isLie: false },
      { text: 'Ostriches bury their heads in the sand when scared.', isLie: true },
    ],
  },
  {
    id: 'animals-4',
    topic: 'Animals',
    statements: [
      { text: 'A group of crows is called a murder.', isLie: false },
      { text: 'Sea otters hold hands while sleeping so they don\u2019t drift apart.', isLie: false },
      { text: 'Dogs only see in black and white.', isLie: true },
    ],
  },
  {
    id: 'animals-5',
    topic: 'Animals',
    statements: [
      { text: 'The heart of a blue whale is about the size of a small car.', isLie: false },
      { text: 'Sloths can hold their breath longer than dolphins.', isLie: false },
      { text: 'Touching a baby bird makes its mother abandon it because of the human scent.', isLie: true },
    ],
  },
  {
    id: 'animals-6',
    topic: 'Animals',
    statements: [
      { text: 'Elephants are one of the few animals that can\u2019t jump.', isLie: false },
      { text: 'A crocodile cannot stick out its tongue.', isLie: false },
      { text: 'Chameleons change color mainly to match their background.', isLie: true },
    ],
  },
  {
    id: 'animals-7',
    topic: 'Animals',
    statements: [
      { text: 'A group of owls is called a parliament.', isLie: false },
      { text: 'Starfish can regrow lost arms.', isLie: false },
      { text: 'Penguins are found naturally at both the North and South Poles.', isLie: true },
    ],
  },
  {
    id: 'animals-8',
    topic: 'Animals',
    statements: [
      { text: 'Kangaroos cannot walk backwards easily.', isLie: false },
      { text: 'A hummingbird can fly backwards.', isLie: false },
      { text: 'Sharks are mammals that nurse their young with milk.', isLie: true },
    ],
  },
  {
    id: 'animals-9',
    topic: 'Animals',
    statements: [
      { text: 'The cheetah is the fastest land animal over short distances.', isLie: false },
      { text: 'A tarantula can survive for a long time without food.', isLie: false },
      { text: 'Spiders are insects.', isLie: true },
    ],
  },
  {
    id: 'animals-10',
    topic: 'Animals',
    statements: [
      { text: 'Dolphins are mammals and breathe air.', isLie: false },
      { text: 'Some frogs can freeze during winter and thaw back to life.', isLie: false },
      { text: 'Bees die immediately if they get their wings wet.', isLie: true },
    ],
  },
];

const FOOD: Round[] = [
  {
    id: 'food-1',
    topic: 'Food',
    statements: [
      { text: 'Honey never spoils if stored properly.', isLie: false },
      { text: 'Bananas are botanically classified as berries.', isLie: false },
      { text: 'Carrots were originally naturally bright orange.', isLie: true },
    ],
  },
  {
    id: 'food-2',
    topic: 'Food',
    statements: [
      { text: 'Peanuts are legumes, not true nuts.', isLie: false },
      { text: 'Apples belong to the same plant family as roses.', isLie: false },
      { text: 'Eating late at night automatically turns food into more fat than eating it during the day.', isLie: true },
    ],
  },
  {
    id: 'food-3',
    topic: 'Food',
    statements: [
      { text: 'Pineapples take about two years to grow a single fruit.', isLie: false },
      { text: 'Chocolate can be toxic to dogs.', isLie: false },
      { text: 'Sugar is the main cause of hyperactivity in children.', isLie: true },
    ],
  },
  {
    id: 'food-4',
    topic: 'Food',
    statements: [
      { text: 'A tomato is botanically a fruit.', isLie: false },
      { text: 'Nutmeg can be poisonous if eaten in large quantities.', isLie: false },
      { text: 'Spinach is exceptionally high in iron compared to most vegetables.', isLie: true },
    ],
  },
  {
    id: 'food-5',
    topic: 'Food',
    statements: [
      { text: 'Cashews grow attached to the bottom of a cashew apple.', isLie: false },
      { text: 'Saffron is one of the most expensive spices in the world by weight.', isLie: false },
      { text: 'Searing meat seals in its juices.', isLie: true },
    ],
  },
  {
    id: 'food-6',
    topic: 'Food',
    statements: [
      { text: 'Chili peppers get their heat from a compound called capsaicin.', isLie: false },
      { text: 'Ripe cranberries bounce when dropped.', isLie: false },
      { text: 'Egg yolks are where most of an egg\u2019s protein is found.', isLie: true },
    ],
  },
];

const HISTORY: Round[] = [
  {
    id: 'history-1',
    topic: 'History',
    statements: [
      { text: 'Oxford University is older than the Aztec Empire.', isLie: false },
      { text: 'Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid.', isLie: false },
      { text: 'The Great Wall of China is visible to the naked eye from the Moon.', isLie: true },
    ],
  },
  {
    id: 'history-2',
    topic: 'History',
    statements: [
      { text: 'The Eiffel Tower can grow taller in summer due to heat expanding the metal.', isLie: false },
      { text: 'Ancient Romans used crushed materials and urine as ingredients in early mouthwash.', isLie: false },
      { text: 'Napoleon Bonaparte was unusually short for his era.', isLie: true },
    ],
  },
  {
    id: 'history-3',
    topic: 'History',
    statements: [
      { text: 'The shortest war in recorded history lasted under an hour.', isLie: false },
      { text: 'Vikings did not actually wear horned helmets in battle.', isLie: false },
      { text: 'People in the Middle Ages believed the Earth was flat.', isLie: true },
    ],
  },
  {
    id: 'history-4',
    topic: 'History',
    statements: [
      { text: 'The Great Fire of London in 1666 killed surprisingly few people.', isLie: false },
      { text: 'Ancient Egyptians were among the first to use written contracts.', isLie: false },
      { text: 'Albert Einstein failed mathematics in school.', isLie: true },
    ],
  },
  {
    id: 'history-5',
    topic: 'History',
    statements: [
      { text: 'The Titanic sank on its maiden voyage in 1912.', isLie: false },
      { text: 'The printing press was popularized in Europe by Johannes Gutenberg.', isLie: false },
      { text: 'The United States declared independence in the year 1812.', isLie: true },
    ],
  },
];

const BODY: Round[] = [
  {
    id: 'body-1',
    topic: 'The Human Body',
    statements: [
      { text: 'Your bones are, ounce for ounce, stronger than steel.', isLie: false },
      { text: 'The human body has roughly as many bacterial cells as human cells.', isLie: false },
      { text: 'Humans only use about 10% of their brains.', isLie: true },
    ],
  },
  {
    id: 'body-2',
    topic: 'The Human Body',
    statements: [
      { text: 'The strongest muscle in the body relative to its size is the jaw muscle.', isLie: false },
      { text: 'Your body produces enough heat in 30 minutes to boil a small amount of water.', isLie: false },
      { text: 'Shaving hair makes it grow back thicker and darker.', isLie: true },
    ],
  },
  {
    id: 'body-3',
    topic: 'The Human Body',
    statements: [
      { text: 'The human nose can detect around a trillion different scents.', isLie: false },
      { text: 'Your heart beats roughly 100,000 times a day.', isLie: false },
      { text: 'Cracking your knuckles causes arthritis.', isLie: true },
    ],
  },
  {
    id: 'body-4',
    topic: 'The Human Body',
    statements: [
      { text: 'Fingernails grow faster than toenails.', isLie: false },
      { text: 'The small intestine is several times longer than the large intestine.', isLie: false },
      { text: 'We have exactly five senses.', isLie: true },
    ],
  },
  {
    id: 'body-5',
    topic: 'The Human Body',
    statements: [
      { text: 'The femur is the longest bone in the human body.', isLie: false },
      { text: 'Adults have fewer bones than newborns because some fuse together.', isLie: false },
      { text: 'The human tongue is divided into fixed zones that each taste only one flavor.', isLie: true },
    ],
  },
];

const GEOGRAPHY: Round[] = [
  {
    id: 'geo-1',
    topic: 'Geography',
    statements: [
      { text: 'Russia spans 11 time zones.', isLie: false },
      { text: 'Africa is the only continent in all four hemispheres.', isLie: false },
      { text: 'Mount Everest is the closest point on Earth to space.', isLie: true },
    ],
  },
  {
    id: 'geo-2',
    topic: 'Geography',
    statements: [
      { text: 'Canada has more lakes than the rest of the world combined.', isLie: false },
      { text: 'The Sahara is the largest hot desert in the world.', isLie: false },
      { text: 'Australia is wider than the Moon.', isLie: true },
    ],
  },
  {
    id: 'geo-3',
    topic: 'Geography',
    statements: [
      { text: 'Istanbul sits on two continents.', isLie: false },
      { text: 'Alaska is the U.S. state with the easternmost and westernmost points.', isLie: false },
      { text: 'Mount Everest is the tallest mountain on Earth measured from base to peak.', isLie: true },
    ],
  },
  {
    id: 'geo-4',
    topic: 'Geography',
    statements: [
      { text: 'The Pacific Ocean is the largest and deepest ocean.', isLie: false },
      { text: 'Vatican City is the smallest country in the world.', isLie: false },
      { text: 'The Amazon River is longer than the distance across the continental United States... backwards from what most maps show.', isLie: true },
    ],
  },
  {
    id: 'geo-5',
    topic: 'Geography',
    statements: [
      { text: 'The Nile is one of the longest rivers in the world.', isLie: false },
      { text: 'Greenland is the largest island on Earth that is not a continent.', isLie: false },
      { text: 'Mount Kilimanjaro is located in South America.', isLie: true },
    ],
  },
];

const SCIENCE: Round[] = [
  {
    id: 'science-1',
    topic: 'Science',
    statements: [
      { text: 'Water can boil and freeze at the same time under the right pressure.', isLie: false },
      { text: 'Lightning is hotter than the surface of the Sun.', isLie: false },
      { text: 'Glass is a slow-moving liquid, which is why old windows are thicker at the bottom.', isLie: true },
    ],
  },
  {
    id: 'science-2',
    topic: 'Science',
    statements: [
      { text: 'Helium can make your voice higher because sound travels faster through it.', isLie: false },
      { text: 'Diamonds are made of pure carbon.', isLie: false },
      { text: 'A penny dropped from a skyscraper could kill a pedestrian below.', isLie: true },
    ],
  },
  {
    id: 'science-3',
    topic: 'Science',
    statements: [
      { text: 'Hot water can freeze faster than cold water under certain conditions.', isLie: false },
      { text: 'Metals expand when heated and contract when cooled.', isLie: false },
      { text: 'Lightning never strikes the same place twice.', isLie: true },
    ],
  },
  {
    id: 'science-4',
    topic: 'Science',
    statements: [
      { text: 'Sound travels faster in water than in air.', isLie: false },
      { text: 'The human eye can detect a single photon under ideal conditions.', isLie: false },
      { text: 'A goldfish\u2019s water bowl gives it enough oxygen because fish don\u2019t really breathe.', isLie: true },
    ],
  },
  {
    id: 'science-5',
    topic: 'Science',
    statements: [
      { text: 'Helium is lighter than air, which is why balloons filled with it rise.', isLie: false },
      { text: 'Rust forms when iron reacts with oxygen and moisture.', isLie: false },
      { text: 'Water is made of one hydrogen atom and two oxygen atoms.', isLie: true },
    ],
  },
];

const SPORTS: Round[] = [
  {
    id: 'sports-1',
    topic: 'Sports',
    statements: [
      { text: 'The Olympic marathon distance is about 26.2 miles.', isLie: false },
      { text: 'A golf ball has dimples to help it fly farther.', isLie: false },
      { text: 'Basketball was invented in the 1800s using an actual basket with the bottom cut out.', isLie: true },
    ],
  },
  {
    id: 'sports-2',
    topic: 'Sports',
    statements: [
      { text: 'Soccer (association football) is the most popular sport in the world.', isLie: false },
      { text: 'A regulation NBA rim is 10 feet off the ground.', isLie: false },
      { text: 'In the original rules, table tennis was played with a champagne cork as the ball.', isLie: true },
    ],
  },
  {
    id: 'sports-3',
    topic: 'Sports',
    statements: [
      { text: 'Boxing rings are actually square.', isLie: false },
      { text: 'The Tour de France is primarily held in France.', isLie: false },
      { text: 'A cricket match can never last more than one day.', isLie: true },
    ],
  },
  {
    id: 'sports-4',
    topic: 'Sports',
    statements: [
      { text: 'A standard soccer match is 90 minutes, split into two halves.', isLie: false },
      { text: 'In tennis, a score of zero is called "love."', isLie: false },
      { text: 'A baseball team has eleven players on the field at once.', isLie: true },
    ],
  },
  {
    id: 'sports-5',
    topic: 'Sports',
    statements: [
      { text: 'An American football team fields 11 players at a time.', isLie: false },
      { text: 'The Olympics are held every four years for the summer games.', isLie: false },
      { text: 'A hockey puck is made of rubber, but pucks are traditionally made of glass.', isLie: true },
    ],
  },
];

const MOVIES: Round[] = [
  {
    id: 'movies-1',
    topic: 'Popular Movies',
    statements: [
      { text: 'The famous line "Luke, I am your father" is a common misquote.', isLie: false },
      { text: 'Toy Story was the first fully computer-animated feature film.', isLie: false },
      { text: 'The Wilhelm scream is a sound effect that has never actually been reused between films.', isLie: true },
    ],
  },
  {
    id: 'movies-2',
    topic: 'Popular Movies',
    statements: [
      { text: 'The shark in Jaws was nicknamed "Bruce" by the crew.', isLie: false },
      { text: 'Anthony Hopkins is on screen for well under 20 minutes in The Silence of the Lambs, yet won Best Actor.', isLie: false },
      { text: 'The "bullet time" effect was invented for the first Fast & Furious film.', isLie: true },
    ],
  },
  {
    id: 'movies-3',
    topic: 'Popular Movies',
    statements: [
      { text: 'Sean Connery was not the first actor ever to play James Bond on screen.', isLie: false },
      { text: 'The Lion King was inspired in part by Shakespeare\u2019s Hamlet.', isLie: false },
      { text: 'Walt Disney personally drew every frame of the first Mickey Mouse cartoon by himself.', isLie: true },
    ],
  },
  {
    id: 'movies-4',
    topic: 'Popular Movies',
    statements: [
      { text: 'Titanic and Avatar were both directed by James Cameron.', isLie: false },
      { text: 'The first feature-length animated film from Disney was Snow White and the Seven Dwarfs.', isLie: false },
      { text: 'The Oscar statuette is officially named "Felix."', isLie: true },
    ],
  },
  {
    id: 'movies-5',
    topic: 'Popular Movies',
    statements: [
      { text: 'Pixar\u2019s first feature film was Toy Story.', isLie: false },
      { text: 'The Marvel Cinematic Universe began with the 2008 film Iron Man.', isLie: false },
      { text: 'Black-and-white films were never nominated for major Academy Awards.', isLie: true },
    ],
  },
];

const STAR_TREK: Round[] = [
  {
    id: 'trek-1',
    topic: 'Popular Shows',
    statements: [
      { text: 'Captain Kirk\u2019s middle name is Tiberius.', isLie: false },
      { text: 'Data is an android who serves aboard the USS Enterprise-D.', isLie: false },
      { text: 'Spock is fully human on both sides of his family.', isLie: true },
    ],
  },
  {
    id: 'trek-2',
    topic: 'Popular Shows',
    statements: [
      { text: 'The Vulcan salute was created by actor Leonard Nimoy.', isLie: false },
      { text: 'The USS Enterprise is powered by a warp drive.', isLie: false },
      { text: 'The Klingons are a peaceful, non-warrior civilization.', isLie: true },
    ],
  },
  {
    id: 'trek-3',
    topic: 'Popular Shows',
    statements: [
      { text: 'Jean-Luc Picard captains the Enterprise-D in The Next Generation.', isLie: false },
      { text: 'Star Trek: The Next Generation is set roughly a century after the original series.', isLie: false },
      { text: 'The phrase "Beam me up, Scotty" is said word-for-word many times in the original series.', isLie: true },
    ],
  },
  {
    id: 'trek-4',
    topic: 'Popular Shows',
    statements: [
      { text: 'The Borg assimilate other species with the phrase "resistance is futile."', isLie: false },
      { text: 'Worf is a Klingon who serves in Starfleet.', isLie: false },
      { text: 'Starfleet\u2019s highest guiding rule is the "Prime Objective."', isLie: true },
    ],
  },
  {
    id: 'trek-5',
    topic: 'Popular Shows',
    statements: [
      { text: 'The holodeck creates realistic simulated environments using holograms.', isLie: false },
      { text: 'A phaser can be set to stun or to kill.', isLie: false },
      { text: 'Warp drive lets a ship travel slower than the speed of light.', isLie: true },
    ],
  },
  {
    id: 'trek-6',
    topic: 'Popular Shows',
    statements: [
      { text: 'Spock serves as science officer under Captain Kirk.', isLie: false },
      { text: 'Dr. McCoy is often called by the nickname "Bones."', isLie: false },
      { text: 'The USS Enterprise in the original series is registered NCC-2701.', isLie: true },
    ],
  },
  {
    id: 'trek-7',
    topic: 'Popular Shows',
    statements: [
      { text: 'Q is a nearly omnipotent being who torments Captain Picard.', isLie: false },
      { text: 'Gene Roddenberry created Star Trek.', isLie: false },
      { text: 'Vulcans are known for being highly emotional and impulsive.', isLie: true },
    ],
  },
  {
    id: 'trek-8',
    topic: 'Popular Shows',
    statements: [
      { text: 'Scotty is the Enterprise\u2019s chief engineer in the original series.', isLie: false },
      { text: 'Sulu serves as the ship\u2019s helmsman.', isLie: false },
      { text: 'The original series was set in the distant past, before Earth had spaceflight.', isLie: true },
    ],
  },
];

const MUSIC: Round[] = [
  {
    id: 'music-1',
    topic: 'Music',
    statements: [
      { text: 'A standard piano has 88 keys.', isLie: false },
      { text: 'The Beatles are from Liverpool, England.', isLie: false },
      { text: 'A song in a minor key is generally described as sounding "happy" or "bright."', isLie: true },
    ],
  },
  {
    id: 'music-2',
    topic: 'Music',
    statements: [
      { text: 'Mozart composed music as a young child.', isLie: false },
      { text: 'A violin has four strings.', isLie: false },
      { text: 'Vinyl records store sound digitally as ones and zeros.', isLie: true },
    ],
  },
  {
    id: 'music-3',
    topic: 'Music',
    statements: [
      { text: 'An octave spans eight notes of a major scale.', isLie: false },
      { text: 'The saxophone was invented by a man named Adolphe Sax.', isLie: false },
      { text: 'The human singing voice cannot be classified into ranges like soprano or bass.', isLie: true },
    ],
  },
  {
    id: 'music-4',
    topic: 'Music',
    statements: [
      { text: 'A guitar in standard tuning has six strings.', isLie: false },
      { text: 'Ludwig van Beethoven continued composing after losing much of his hearing.', isLie: false },
      { text: 'A drum is a string instrument.', isLie: true },
    ],
  },
  {
    id: 'music-5',
    topic: 'Music',
    statements: [
      { text: 'A cello is played while seated, held between the knees.', isLie: false },
      { text: 'The tuba is one of the lowest-pitched brass instruments.', isLie: false },
      { text: 'A metronome is used to make instruments louder.', isLie: true },
    ],
  },
];

const TECH: Round[] = [
  {
    id: 'tech-1',
    topic: 'Technology',
    statements: [
      { text: 'The first computer "bug" was linked to an actual moth found in a machine.', isLie: false },
      { text: 'A kilobyte is larger than a megabyte.', isLie: true },
      { text: 'The "@" symbol was used in commerce long before email existed.', isLie: false },
    ],
  },
  {
    id: 'tech-2',
    topic: 'Technology',
    statements: [
      { text: 'The first iPhone was released in 2007.', isLie: false },
      { text: 'Wi-Fi stands for nothing in particular; it was coined as a catchy brand name.', isLie: false },
      { text: 'Incognito mode makes you completely anonymous and untraceable online.', isLie: true },
    ],
  },
  {
    id: 'tech-3',
    topic: 'Technology',
    statements: [
      { text: 'Bluetooth is named after a medieval Scandinavian king.', isLie: false },
      { text: 'The programming language Python is named after the comedy group Monty Python.', isLie: false },
      { text: 'Deleting a file from your computer immediately erases it permanently from the drive.', isLie: true },
    ],
  },
  {
    id: 'tech-4',
    topic: 'Technology',
    statements: [
      { text: 'A QR code can store more information than a traditional barcode.', isLie: false },
      { text: 'The word "robot" comes from a Czech play.', isLie: false },
      { text: 'HTTP and HTTPS are identical, with no difference in security.', isLie: true },
    ],
  },
  {
    id: 'tech-5',
    topic: 'Technology',
    statements: [
      { text: 'RAM is temporary memory that clears when a computer powers off.', isLie: false },
      { text: 'The first widely used web browser helped launch the public internet in the 1990s.', isLie: false },
      { text: 'A firewall is a physical wall that keeps computers from overheating.', isLie: true },
    ],
  },
];

const HARRY_POTTER: Round[] = [
  {
    id: 'hp-1',
    topic: 'Popular Movies',
    statements: [
      { text: 'Harry Potter has a lightning-bolt scar on his forehead.', isLie: false },
      { text: 'Harry\u2019s pet is a snowy owl named Hedwig.', isLie: false },
      { text: 'Harry is sorted into Slytherin house at Hogwarts.', isLie: true },
    ],
  },
  {
    id: 'hp-2',
    topic: 'Popular Movies',
    statements: [
      { text: 'Hermione Granger is known for being very clever and studious.', isLie: false },
      { text: 'Ron Weasley comes from a large family with red hair.', isLie: false },
      { text: 'The three main friends are Harry, Hermione, and Draco.', isLie: true },
    ],
  },
  {
    id: 'hp-3',
    topic: 'Popular Movies',
    statements: [
      { text: 'Hogwarts has four houses: Gryffindor, Slytherin, Hufflepuff, and Ravenclaw.', isLie: false },
      { text: 'The sport played on broomsticks is called Quidditch.', isLie: false },
      { text: 'Students travel to Hogwarts by airplane from London.', isLie: true },
    ],
  },
  {
    id: 'hp-4',
    topic: 'Popular Movies',
    statements: [
      { text: 'Lord Voldemort is the main villain of the series.', isLie: false },
      { text: 'Albus Dumbledore is the headmaster of Hogwarts.', isLie: false },
      { text: 'Harry\u2019s wand is made of solid gold.', isLie: true },
    ],
  },
  {
    id: 'hp-5',
    topic: 'Popular Movies',
    statements: [
      { text: 'A Golden Snitch is a small winged ball used in Quidditch.', isLie: false },
      { text: 'Hagrid is the Hogwarts gamekeeper and loves magical creatures.', isLie: false },
      { text: 'Muggles are witches and wizards with the strongest magical powers.', isLie: true },
    ],
  },
  {
    id: 'hp-6',
    topic: 'Popular Movies',
    statements: [
      { text: 'The train to Hogwarts leaves from Platform Nine and Three-Quarters.', isLie: false },
      { text: 'Severus Snape teaches at Hogwarts.', isLie: false },
      { text: 'Harry Potter was written by author Roald Dahl.', isLie: true },
    ],
  },
];

const FRIENDS: Round[] = [
  {
    id: 'friends-1',
    topic: 'Popular Shows',
    statements: [
      { text: 'The show follows six friends living in New York City.', isLie: false },
      { text: 'Central Perk is the coffee house where the friends often hang out.', isLie: false },
      { text: 'The six friends all live together in one giant house.', isLie: true },
    ],
  },
  {
    id: 'friends-2',
    topic: 'Popular Shows',
    statements: [
      { text: 'Ross and Monica Geller are brother and sister.', isLie: false },
      { text: 'Joey is an aspiring actor known for the line "How you doin\u2019?"', isLie: false },
      { text: 'Chandler and Joey are brothers.', isLie: true },
    ],
  },
  {
    id: 'friends-3',
    topic: 'Popular Shows',
    statements: [
      { text: 'Phoebe performs a song called "Smelly Cat."', isLie: false },
      { text: 'Ross is a paleontologist who studies dinosaurs.', isLie: false },
      { text: 'The show is set primarily in Los Angeles.', isLie: true },
    ],
  },
  {
    id: 'friends-4',
    topic: 'Popular Shows',
    statements: [
      { text: 'Rachel first appears in the pilot wearing a wedding dress.', isLie: false },
      { text: 'Monica is known for being very neat and competitive.', isLie: false },
      { text: 'Gunther is the owner of a rival coffee shop across the street.', isLie: true },
    ],
  },
  {
    id: 'friends-5',
    topic: 'Popular Shows',
    statements: [
      { text: 'Ross says the wrong name at his wedding to Emily.', isLie: false },
      { text: 'Chandler is known for his sarcastic sense of humor.', isLie: false },
      { text: 'Joey has a pet monkey named Marcel.', isLie: true },
    ],
  },
  {
    id: 'friends-6',
    topic: 'Popular Shows',
    statements: [
      { text: 'The theme song is "I\u2019ll Be There for You."', isLie: false },
      { text: 'Ross and Rachel have a daughter named Emma.', isLie: false },
      { text: 'The show ran for just two seasons.', isLie: true },
    ],
  },
];

const SEINFELD: Round[] = [
  {
    id: 'seinfeld-1',
    topic: 'Popular Shows',
    statements: [
      { text: 'The show was famously described as being "about nothing."', isLie: false },
      { text: 'Jerry Seinfeld plays a version of himself as a comedian.', isLie: false },
      { text: 'The show is set in Chicago.', isLie: true },
    ],
  },
  {
    id: 'seinfeld-2',
    topic: 'Popular Shows',
    statements: [
      { text: 'George Costanza is one of Jerry\u2019s closest friends.', isLie: false },
      { text: 'Kramer is Jerry\u2019s eccentric neighbor.', isLie: false },
      { text: 'Elaine is Jerry\u2019s sister.', isLie: true },
    ],
  },
  {
    id: 'seinfeld-3',
    topic: 'Popular Shows',
    statements: [
      { text: 'Kramer is known for dramatically bursting through Jerry\u2019s apartment door.', isLie: false },
      { text: 'The phrase "yada yada yada" was popularized by the show.', isLie: false },
      { text: 'The main characters are a tight-knit, deeply sentimental group.', isLie: true },
    ],
  },
  {
    id: 'seinfeld-4',
    topic: 'Popular Shows',
    statements: [
      { text: '"The Soup Nazi" is a famous Seinfeld episode.', isLie: false },
      { text: 'George often schemes to get out of work or awkward situations.', isLie: false },
      { text: 'The show is set mainly in Miami, Florida.', isLie: true },
    ],
  },
  {
    id: 'seinfeld-5',
    topic: 'Popular Shows',
    statements: [
      { text: 'Newman is a mail carrier and Jerry\u2019s rival.', isLie: false },
      { text: 'A famous episode revolves around a contest of self-restraint.', isLie: false },
      { text: 'Jerry works as a police detective on the show.', isLie: true },
    ],
  },
  {
    id: 'seinfeld-6',
    topic: 'Popular Shows',
    statements: [
      { text: 'The show largely takes place in Jerry\u2019s apartment and a local diner.', isLie: false },
      { text: 'Elaine is known for her distinctive, wild dance moves in one episode.', isLie: false },
      { text: 'The four main characters end the series by getting married to each other.', isLie: true },
    ],
  },
];

const THE_OFFICE: Round[] = [
  {
    id: 'office-1',
    topic: 'Popular Shows',
    statements: [
      { text: 'The show is filmed in a mockumentary style.', isLie: false },
      { text: 'It is set at a paper company called Dunder Mifflin.', isLie: false },
      { text: 'The office is located in New York City.', isLie: true },
    ],
  },
  {
    id: 'office-2',
    topic: 'Popular Shows',
    statements: [
      { text: 'Michael Scott is the regional manager for much of the series.', isLie: false },
      { text: 'Jim and Pam have a well-known romance across the show.', isLie: false },
      { text: 'Dwight is Michael\u2019s boss and owns the company.', isLie: true },
    ],
  },
  {
    id: 'office-3',
    topic: 'Popular Shows',
    statements: [
      { text: 'Dwight Schrute owns and works on a beet farm.', isLie: false },
      { text: 'The U.S. version is based on a British show of the same name.', isLie: false },
      { text: 'The show is set in Los Angeles, California.', isLie: true },
    ],
  },
  {
    id: 'office-4',
    topic: 'Popular Shows',
    statements: [
      { text: 'Dunder Mifflin is located in Scranton, Pennsylvania.', isLie: false },
      { text: 'Jim frequently plays pranks on Dwight.', isLie: false },
      { text: 'Michael Scott is a strict, humorless boss with no interest in being liked.', isLie: true },
    ],
  },
  {
    id: 'office-5',
    topic: 'Popular Shows',
    statements: [
      { text: 'Kevin is known for loving food and once spilling a huge pot of chili.', isLie: false },
      { text: 'Steve Carell played Michael Scott.', isLie: false },
      { text: 'The company sells computers and smartphones.', isLie: true },
    ],
  },
  {
    id: 'office-6',
    topic: 'Popular Shows',
    statements: [
      { text: 'Jim and Pam get married during the series.', isLie: false },
      { text: 'Andy Bernard is known for his anger issues and a cappella singing.', isLie: false },
      { text: 'The characters never speak directly to the camera at any point.', isLie: true },
    ],
  },
];

/**
 * All rounds, flattened. The game consumes this. Categories above are just for
 * organization; add a new category array and spread it in here to grow the set.
 */
export const ALL_ROUNDS: Round[] = [
  ...SPACE,
  ...ANIMALS,
  ...STAR_TREK,
  ...HARRY_POTTER,
  ...FOOD,
  ...HISTORY,
  ...BODY,
  ...GEOGRAPHY,
  ...SCIENCE,
  ...SPORTS,
  ...MOVIES,
  ...FRIENDS,
  ...SEINFELD,
  ...THE_OFFICE,
  ...MUSIC,
  ...TECH,
];

/**
 * Backwards-compatible export. `App.tsx` imports `ROUNDS`, so keep it pointing
 * at the full set. (Kept as a separate name so existing imports don't break.)
 */
export const ROUNDS: Round[] = ALL_ROUNDS;

/** The list of distinct category names, in first-seen order. */
export const CATEGORIES: string[] = Array.from(new Set(ALL_ROUNDS.map((r) => r.topic)));

export interface CategorySummary {
  /** The category/topic name, e.g. "Star Trek". */
  name: string;
  /** How many rounds this category has. */
  count: number;
}

/** Categories with their round counts, for rendering a picker menu. */
export const CATEGORY_SUMMARIES: CategorySummary[] = CATEGORIES.map((name) => ({
  name,
  count: ALL_ROUNDS.filter((r) => r.topic === name).length,
}));

/** Returns the rounds for a given category name. */
export function roundsForCategory(name: string): Round[] {
  return ALL_ROUNDS.filter((r) => r.topic === name);
}
