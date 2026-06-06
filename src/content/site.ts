export type LinkItem = {
  readonly label: string;
  readonly href: string;
};

export type ProjectItem = {
  readonly name: string;
  readonly languages: string;
  readonly type: string;
  readonly description: string;
  readonly links: readonly LinkItem[];
};

export type FeaturedProject = {
  readonly name: string;
  readonly url: string;
  readonly languages: string;
  readonly type: string;
  readonly summary: string;
  readonly description: string;
  readonly stats: readonly {
    readonly value: string;
    readonly label: string;
  }[];
  readonly features: readonly {
    readonly title: string;
    readonly body: string;
  }[];
  readonly screenshots: readonly {
    readonly src: string;
    readonly alt: string;
    readonly caption: string;
  }[];
  readonly links: readonly LinkItem[];
};

export type CarouselSlide = {
  readonly src: string;
  readonly alt: string;
  readonly outcomeLabel: string;
  readonly outcomeHeadline: string;
  readonly caption: string;
  readonly callout?: {
    readonly label: string;
    readonly variant: "mission-global-face";
  };
};

export const siteData = {
  name: "William Hanlon",
  location: "Ely, UK",
  context: "16-year-old GCSE student",
  intro:
    "I build and experiment with software, infrastructure, Linux systems and AI.",
  availability: "Looking for internships or junior opportunities.",
  contact: {
    email: "willliamjhanlon@icloud.com",
    github: "https://github.com/stackwill",
  },
  carouselSlides: [
    {
      src: "/mission-global-image.jpeg",
      alt:
        "Will Hanlon standing with a mug in the Mission Global office in Dubai while colleagues work at nearby desks.",
      outcomeLabel: "Outcome",
      outcomeHeadline: "Offered paid remote work after my WEX placement.",
      caption:
        "That followed my redesign of part of Mission Global's internal project management system in Dubai.",
    },
    {
      src: "/carousel-starter.jpeg",
      alt:
        "Will Hanlon working on a laptop connected to external monitors while building an event logistics interface during placement.",
      outcomeLabel: "Outcome",
      outcomeHeadline: "Offered paid remote work after my WEX placement.",
      caption:
        "That followed my redesign of part of Mission Global's internal project management system in Dubai.",
    },
  ] satisfies readonly CarouselSlide[],
  placement: {
    eyebrow: "WORK EXPERIENCE",
    company: "Mission Global",
    displayCompany: "Mission Global - Dubai",
    website: "https://mission-global.com",
    location: "Dubai",
    imageSrc: "/mission-global-image.jpeg",
    imageAlt:
      "Will Hanlon standing with a mug in the Mission Global office in Dubai while colleagues work at nearby desks.",
    caption:
      "My Year 10 placement at Mission Global Dubai led to a paid remote work offer after I redesigned part of their internal project management system.",
  },
  infrastructure: [
    "I run Proxmox VE on my own hardware at home.",
    "The setup includes 15+ active LXC containers and self-hosted services.",
    "I run a home media setup that my family uses regularly.",
    "I use Linux daily and have worked across Arch, Ubuntu and Ubuntu Server.",
    "I have hands-on experience with systemd, permissions, services, SSH, Docker Compose and Ansible.",
    "I have worked with networking basics including DNS, DHCP and static assignment.",
  ],
  delivery: [
    "I have built CI/CD workflows with GitHub Actions.",
    "I have built auto-deploying static sites to Cloudflare pages (like this site you're viewing!)",
    "I have experimented with GitOps and Kubernetes.",
  ],
  ai: [
    "I use Codex heavily as part of my development workflow.",
    "I also use Claude Code and have had a strong interest in AI since before GPT-3.5.",
    "I experiment with local models and use OpenRouter for inference.",
    "I keep up with the current model landscape and understand concepts like mixture-of-experts.",
  ],
  featuredProject: {
    name: "IHateGCSE",
    url: "https://ihategcse.com",
    languages: "TypeScript, Node.js, Docker, GitHub Actions, Linux, Codex",
    type: "Revision platform",
    summary:
      "A GCSE revision website that turns past papers into a marked practice flow.",
    description:
      "IHateGCSE imports real PMT papers and mark schemes, splits papers into question groups, renders question crops automatically, then allows students to answer actual past papers and get instant AI marking, sourced with the actual mark scheme. I'm self-hosting the entire project on my homelab.",
    stats: [
      { value: "55", label: "imported papers" },
      { value: "1,264", label: "question parts" },
      { value: "3,830", label: "marks available" },
      { value: "12", label: "course groups" },
    ],
    features: [
      {
        title: "Import pipeline",
        body: "Paper download, question extraction, image crops, mark scheme extraction and data releases to my server",
      },
      {
        title: "AI marking",
        body: "Student answer is combined with the mark scheme and any relevant context to provide an accurate mark",
      },
      {
        title: "Self-hosted",
        body: "Dockerised deployments through GitHub Actions straight onto my own hardware",
      },
    ],
    screenshots: [
      {
        src: "/followthescheme-home.png",
        alt: "IHateGCSE homepage showing the subject library and GCSE paper counts.",
        caption: "Subject library with imported papers and exam countdown.",
      },
      {
        src: "/followthescheme-subject.png",
        alt: "IHateGCSE answer page showing a Computer Science question group with answer fields.",
        caption: "Question groups with cropped paper images and answer inputs.",
      },
      {
        src: "/followthescheme-paper.png",
        alt: "IHateGCSE Biology answer page showing an AI-marked answer awarded one mark.",
        caption: "Biology practice with an answer marked against the official mark scheme.",
      },
    ],
    links: [
      { label: "Website", href: "https://ihategcse.com/demo/portfolio" },
      { label: "GitHub", href: "https://github.com/stackwill/follow-the-scheme" },
    ],
  } satisfies FeaturedProject,
  projects: [
    {
      name: "convertparty",
      languages: "Python",
      type: "Full stack web application",
      description:
        "A project inspired by copyparty but designed for file conversions, supporting over 150 file types locally in a single dependency-light Python script.",
      links: [{ label: "GitHub", href: "https://github.com/stackwill/convertparty" }],
    },
    {
      name: "ultranano",
      languages: "Rust, Lua",
      type: "CLI tool",
      description: "A Rust-based text editor with a Lua plugin engine.",
      links: [{ label: "GitHub", href: "https://github.com/stackwill/ultranano-old" }],
    },
    {
      name: "easydictate",
      languages: "Python",
      type: "General purpose program",
      description:
        "A voice dictation tool using Groq's OpenWhisper API for fast dictation, with Linux integration to start on boot.",
      links: [{ label: "GitHub", href: "https://github.com/stackwill/easydictate" }],
    },
    {
      name: "tweak",
      languages: "Rust",
      type: "CLI tool",
      description: "A TUI for editing config files using crossterm and ratatui.",
      links: [{ label: "GitHub", href: "https://github.com/stackwill/tweak" }],
    },
    {
      name: "older portfolio website",
      languages: "TypeScript",
      type: "Website",
      description:
        "An earlier portfolio site that is still useful as a reference point for previous work.",
      links: [
        { label: "Website", href: "https://w1.lol" },
        { label: "GitHub", href: "https://github.com/stackwill/portfolio-os" },
      ],
    },
    {
      name: "pow",
      languages: "Go",
      type: "CLI tool",
      description: "An older Go project in a similar area to later editor work.",
      links: [{ label: "GitHub", href: "https://github.com/stackwill/pow" }],
    },
  ],
} as const;
