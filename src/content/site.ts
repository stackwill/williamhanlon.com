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

export type CarouselSlide = {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
};

export const siteData = {
  name: "William Hanlon",
  location: "Ely, UK",
  context: "16-year-old GCSE student",
  intro:
    "I'm interested in software, infrastructure, Linux systems and AI.",
  availability: "Looking for internships or junior opportunities.",
  contact: {
    email: "willliamjhanlon@icloud.com",
    github: "https://github.com/stackwill",
  },
  carouselSlides: [
    {
      src: "/carousel-starter.jpeg",
      alt:
        "Will Hanlon working on a laptop connected to external monitors while building an event logistics interface during placement.",
      caption:
        "Working at Mission Global Dubai, I redesigned part of an internal project management system and was later offered paid remote work.",
    },
    {
      src: "/mission-global-image.jpeg",
      alt:
        "Will Hanlon standing with a mug in the Mission Global office in Dubai while colleagues work at nearby desks.",
      caption:
        "Working at Mission Global Dubai, I redesigned part of an internal project management system and was later offered paid remote work.",
    },
  ] satisfies readonly CarouselSlide[],
  placement: {
    eyebrow: "Year 10 placement",
    company: "Mission Global",
    location: "Dubai",
    imageSrc: "/mission-global-image.jpeg",
    imageAlt:
      "Will Hanlon standing with a mug in the Mission Global office in Dubai while colleagues work at nearby desks.",
    caption:
      "Year 10 placement in Dubai at Mission Global. I redesigned part of an internal project management system and was later offered paid remote work.",
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
    "I push built Docker images to GHCR and deploy them remotely to a Proxmox VM.",
    "I have experimented with GitOps and with k3s or k8s.",
  ],
  ai: [
    "I have had a strong interest in AI since GPT-3.",
    "I use AI development tools heavily.",
    "I have experimented with local models and used OpenRouter.",
    "I keep up with the current model landscape and understand concepts like mixture-of-experts.",
  ],
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
      links: [{ label: "GitHub", href: "https://github.com/stackwill/ultranano" }],
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
