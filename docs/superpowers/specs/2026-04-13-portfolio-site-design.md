# Portfolio Site Design

## Goal

Build a single-page portfolio site for William Hanlon that is optimized for internship and junior-role hiring. The site should make the strongest evidence visible immediately, prioritize contact by email, and support skimming. The page should feel personal and credible rather than overly branded or overly polished.

## Audience

The main audience is internship and junior-role recruiters, hiring managers, and technical people reviewing candidates quickly. The secondary audience is other developers who may click through to GitHub for supporting proof.

## Core Positioning

The site should position William as a 16-year-old GCSE student with unusually strong technical evidence across software, infrastructure, Linux systems, and AI. The presentation should not overstate experience or try to sound corporate. The age and student status should appear early so the work is understood in context.

## Primary Outcome

The main call to action is direct contact by email. GitHub should be visible as supporting proof, but it should not compete with email as the main next step.

## Content Strategy

`portfolio-text.md` is source material rather than final polished copy. The implementation should preserve project descriptions where useful, but the site structure should be optimized around clarity and ordering rather than copying the dump verbatim.

The content should be ordered by impressiveness and relevance for fast skimming:

1. Intro and positioning
2. Year 10 placement at Mission Global
3. Infrastructure and systems experience
4. Delivery and deployment experience
5. Selected projects
6. AI interest and tooling
7. Contact

## Information Architecture

### Intro

The top of the page should contain:

- William's name
- age and GCSE-student context
- Ely location
- a short first-person positioning statement covering software, datacenter or infrastructure interests, Linux systems, and AI
- a primary email call to action
- a secondary GitHub link

The intro copy should be plain but slightly polished. It should be first-person, not third-person.

### Placement

The Year 10 work experience at Mission Global should be the lead proof section near the top of the site. The image file `mission-global-image.jpeg` should be the main image on the page.

This section should make clear:

- the placement happened in Dubai
- William redesigned part of an internal project management system
- a paid remote offer followed afterwards

The image caption should explicitly connect the image to the placement. The image should function as evidence rather than decoration.

### Infrastructure

This section should present the strongest systems and infrastructure experience, including:

- Proxmox VE on self-managed home hardware
- 15+ active LXC containers
- self-hosted services
- home media setup used by family
- Linux experience across Arch, Ubuntu, and Ubuntu Server
- systemd, permissions, services, SSH
- Ansible
- networking experience including DNS, DHCP, static assignment
- Docker Compose

This section should read as technical evidence rather than a list of buzzwords.

### Delivery and Deployment

This section should highlight operational and deployment work, including:

- CI/CD with GitHub Actions
- pushing built images to GHCR
- remote deployment flow to a Proxmox VM
- service restarts after deploy
- GitOps
- experimentation with k3s or k8s

### Projects

Projects should not lead the page. They should appear after the stronger real-world and infrastructure evidence.

Projects should be shown in an order that supports the strongest impression. The initial recommended order is:

1. convertparty
2. ultranano
3. easydictate
4. tweak
5. older portfolio website
6. pow

Each project entry should include:

- project name
- language or languages
- project type
- short description
- outbound links where available

The project descriptions can be refined structurally but should remain faithful to the source content.

### AI

This section should present AI as a meaningful interest and working area, but not as the main proof point over stronger evidence such as the placement or infrastructure work.

This section can include:

- long-running interest since GPT-3 era
- use of AI development tools
- experimentation with local models
- use of OpenRouter
- awareness of current model landscape
- familiarity with concepts like mixture-of-experts

The tone should remain grounded and avoid inflated claims.

### Contact

The page should end with a clear contact section that repeats email prominently. GitHub should appear nearby as a secondary destination.

## Visual Direction

The design should be light-theme only. It should be mostly monochrome, with color used sparingly. The page should feel utilitarian, restrained, and text-led rather than flashy or highly experimental.

The visual tone should be closer to a technical profile, dossier, or field report than an agency portfolio.

Use:

- an off-white or softly tinted light background
- dark text with strong contrast
- thin dividers or rules
- modest supporting greys
- restrained accents only where necessary for links, focus states, or important labels

Avoid:

- loud gradients
- highly animated transitions
- card-heavy layouts
- decorative effects that compete with the content
- "creative portfolio" tropes that make the site feel generic or AI-generated

The image should provide most of the visual intensity on the page.

## Layout

The layout should use a strong left-aligned reading flow with clear vertical rhythm. It should feel structured and easy to skim rather than dense or overly minimal.

Expected layout characteristics:

- one main content column for text
- occasional wider treatment for the featured placement image
- generous section spacing
- concise headings and labels
- readable line lengths

The page should remain easy to edit later. The content model should support reordering or rewriting copy without major layout changes.

## Mobile Requirements

Mobile is a first-class requirement rather than a fallback. The page should be designed to work well on phones as a primary viewing context.

On mobile:

- hierarchy must remain clear immediately
- the email call to action should remain visible near the top
- the featured image must scale cleanly without awkward cropping or layout breakage
- long lines of metadata must wrap cleanly
- project entries must stay readable without horizontal pressure
- spacing should feel deliberate rather than compressed

The mobile layout should not hide important content that appears on desktop. It should adapt the composition while preserving the same order of importance.

## Interaction

Interaction should remain minimal and purposeful.

Include:

- clear hover and focus states for links
- obvious and usable touch targets on mobile
- no unnecessary motion

Avoid:

- large entrance animations
- parallax
- novelty interactions

## Technical Shape

Implementation should stay simple. This is a static single-page site rather than a complex application.

Recommended structure:

- a top-level page shell
- reusable section wrapper for headings and spacing
- small structured data for projects and proof items
- one featured placement component or section using `mission-global-image.jpeg`
- a simple contact block

The code should be maintainable and easy to revise as copy changes.

## Content Constraints

- The site copy should be written in first person.
- The content should feel plain but slightly polished.
- The implementation should optimize structure and hierarchy more than final wording polish.
- The site should not make claims that are not grounded in the source material.

## Success Criteria

The design succeeds if a recruiter or hiring manager can understand the following within a quick skim:

- William is 16 and still in school
- he has already done meaningful technical work
- he has unusually strong infrastructure and Linux interest for his stage
- he builds real projects across multiple languages
- he is interested in software, datacenter or infrastructure work, and AI
- the clearest next step is to email him
