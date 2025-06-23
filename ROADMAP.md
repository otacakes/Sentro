# Project Roadmap

This document outlines the development plan for Sentro, from initial setup to a mature, feature-rich platform.

## Project Vision

Sentro is dedicated to empowering commuters in the Philippines to take control of their daily journeys. The platform provides live vehicle tracking, crowd level insights, and instant alerts for trains, buses, and modern jeepneys. Sentro is a privacy-first, community-driven, open-source solution for smarter, more reliable travel.

## Development Phases

### Phase 1: Foundation and Minimum Viable Product (Current Focus)

**Objective:** Launch a robust web application that establishes the core user experience and essential administrative features.

| Category             | Task                                                                               | Status      |
| :------------------- | :--------------------------------------------------------------------------------- | :---------- |
| Technical Foundation | Set up Next.js 15 monorepo with TypeScript and Tailwind CSS.                       | Complete    |
|                      | Integrate Supabase for database and authentication.                                | Complete    |
|                      | Implement NextAuth.js for session management.                                      | Complete    |
|                      | Integrate Leaflet with OpenStreetMap for the core map view.                        | Complete    |
|                      | Establish CI/CD pipeline with GitHub Actions for linting and testing.              | In Progress |
| User Authentication  | Implement user sign-up, sign-in, and sign-out flows.                               | Complete    |
|                      | Implement password reset functionality.                                            | In Progress |
|                      | Set up basic user profile management (view/edit).                                  | In Progress |
| Core User Feature    | Develop the basic multi-modal route planning algorithm (v1).                       | In Progress |
|                      | Implement interactive route visualization (drawing polylines on the map).          | In Progress |
|                      | Build the "Favorite Locations" feature (CRUD operations).                          | Planned     |
|                      | Implement basic search history tracking.                                           | Planned     |
| Admin System         | Build the secure admin dashboard layout.                                           | In Progress |
|                      | Implement user management table with view and search capabilities.                 | Planned     |
|                      | Develop the content management system for creating and publishing news and alerts. | Planned     |
|                      | Display basic system statistics (total users, total alerts).                       | Planned     |

---

### Phase 2: Community and Real-Time Features

**Objective:** Enhance the platform with live, community-driven data and improve the mobile web experience, transforming it into a dynamic, real-time tool.

| Category             | Task                                                                              | Status  |
| :------------------- | :-------------------------------------------------------------------------------- | :------ |
| Technical Foundation | Implement Supabase real-time subscriptions for live data feeds.                   | Planned |
|                      | Develop offline caching strategy for PWA (maps, user data, recent alerts).        | Planned |
|                      | Integrate real-time weather API to display current conditions.                    | Planned |
| Community Features   | Implement the front-end for community reporting (crowd levels, delays).           | Planned |
|                      | Create the backend logic to receive and process user reports.                     | Planned |
|                      | Display crowdsourced data visually on the map and route details.                  | Planned |
| User Features        | Implement user settings for notifications and privacy.                            | Planned |
|                      | Add push notifications for severe service alerts (using Supabase Edge Functions). | Planned |
|                      | Refine the UI/UX for mobile browsers.                                             | Planned |
| Admin System         | Build moderation tools for community-submitted reports.                           | Planned |
|                      | Add advanced analytics to the dashboard (e.g., interactive charts with Recharts). | Planned |
|                      | Implement role management for assigning admin and super_admin roles.              | Planned |

---

### Phase 3: Mobile Application and Expansion

**Objective:** Expand the platform by launching a native mobile application and introducing advanced features and localization.

| Category             | Task                                                                                       | Status  |
| :------------------- | :----------------------------------------------------------------------------------------- | :------ |
| Technical Foundation | Decide on mobile framework (React Native or Flutter).                                      | Planned |
|                      | Set up mobile application project, sharing services/logic with the web app where possible. | Planned |
|                      | Plan API strategy to serve both web and mobile clients efficiently.                        | Planned |
| Mobile App (MVP)     | Implement user authentication flow, reusing Supabase backend.                              | Planned |
|                      | Re-create the core route planning and map visualization experience.                        | Planned |
|                      | Implement native push notifications.                                                       | Planned |
|                      | Distribute initial versions via direct APK download on GitHub Releases.                    | Planned |
| Feature Expansion    | Implement multi-language support (Tagalog, Cebuano).                                       | Planned |
|                      | Develop advanced search filters (e.g., filter by transport type, time).                    | Planned |
|                      | Add accessibility features (WCAG 2.1 compliance).                                          | Planned |
| Admin System         | Add analytics specific to mobile app usage.                                                | Planned |
|                      | Create tools for sending targeted push notifications from the admin dashboard.             | Planned |

---

### Phase 4: Maturity and Intelligent Features

**Objective:** Evolve the application into an intelligent travel companion using data science, while preparing for official app store launches.

| Category                   | Task                                                                             | Status  |
| :------------------------- | :------------------------------------------------------------------------------- | :------ |
| Technical Foundation       | Refactor codebase and optimize database queries for scale.                       | Planned |
|                            | Conduct security audits and performance analysis.                                | Planned |
| Intelligent Features       | Research and develop machine learning models for predictive travel times.        | Planned |
|                            | Develop algorithms for suggesting optimal travel times based on historical data. | Planned |
|                            | Implement smart alerts based on user preferences and travel patterns.            | Planned |
| Community and Gamification | Introduce user profiles with contribution scores and badges.                     | Planned |
|                            | Create leaderboards for top data contributors.                                   | Planned |
| Deployment                 | Prepare for Google Play Store and Apple App Store submission.                    | Planned |

## Success Metrics

### User Engagement

- Daily active users
- Session duration
- Feature adoption rate
- Retention rate

### Technical Performance

- Load time
- Uptime
- Error rate
- Mobile performance (Lighthouse score)

### Community Impact

- Number of user reports
- Community contributions
- Local partnerships
- Media coverage

## Technical Requirements

### Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

### Accessibility Standards

- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support
- Minimum color contrast ratio of 4.5:1

### Security Requirements

- End-to-end data encryption
- Multi-factor authentication (planned)
- GDPR compliance
- Regular security assessments

## Monitoring and Analytics

### Key Performance Indicators

- User acquisition
- Feature usage rates
- User retention
- Performance metrics
- Error tracking

### Tools and Services

- Google Analytics, Vercel Analytics
- Sentry, LogRocket
- Lighthouse, WebPageTest
- Pingdom, UptimeRobot

## Community Involvement

### Open Source Contributions

- Peer code review process
- Community documentation
- Beta testing program
- User feedback system

### Partnerships

- Collaboration with transport agencies
- Research partnerships with universities
- API integrations with technology companies
- Engagement with community organizations

## Growth Strategy

### User Acquisition

- Social media outreach
- Partnerships with transport agencies
- Search engine optimization
- User referral program

### Revenue Model

- Freemium model for basic and premium features
- Enterprise solutions for business clients
- Revenue sharing through partnerships

## Success Criteria

### Phase 1

- Project foundation complete
- Basic user interface operational
- Authentication system functional
- Admin dashboard operational
- Route planning functional
- MVP launch

### Phase 2

- Real-time features operational
- Community reporting functional
- Mobile web experience optimized
- Push notifications implemented
- Advanced admin features complete

### Phase 3

- Mobile application launched
- Multi-language support implemented
- Accessibility compliance achieved
- Expanded user base
- High community engagement

### Phase 4

- Intelligent features implemented
- App store deployment completed
- Gamification system active
- Platform stability and maturity
- Revenue streams established

## Contact and Support

For questions, support, or to contribute, please use the following channels:

- GitHub Issues: Report bugs and request features
- GitHub Discussions: Community discussions
- Documentation: Project documentation
- Contributing: See CONTRIBUTING.md

---

This roadmap is a living document and will be updated as the project evolves.
