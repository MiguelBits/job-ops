import { describe, expect, it } from "vitest";
import { convertDesignResumeToReactiveResumeV5Document } from "./reactive-resume-export";

describe("convertDesignResumeToReactiveResumeV5Document", () => {
  it("converts the local design resume shape into a canonical RxResume v5 document", () => {
    const converted = convertDesignResumeToReactiveResumeV5Document({
      picture: {
        url: "/api/design-resume/assets/picture/content",
        show: true,
        size: 96,
      },
      basics: {
        name: "Jane Doe",
        headline: "Engineer",
        email: "jane@example.com",
        phone: "123",
        location: "London",
        website: {
          url: "https://example.com",
          label: "example.com",
        },
        customFields: [
          {
            id: "field-1",
            icon: "globe",
            text: "Portfolio",
            link: "https://example.com",
          },
        ],
      },
      summary: {
        title: "Summary",
        columns: 1,
        hidden: false,
        content: "<p>Hello</p>",
      },
      sections: {
        profiles: { title: "Profiles", columns: 1, hidden: false, items: [] },
        experience: {
          title: "Experience",
          columns: 1,
          hidden: false,
          items: [],
        },
        education: { title: "Education", columns: 1, hidden: false, items: [] },
        projects: {
          title: "Projects",
          columns: 1,
          hidden: false,
          items: [
            {
              id: "project-1",
              hidden: false,
              name: "Job Ops",
              period: "2025",
              website: { url: "https://example.com/jobops", label: "" },
              description: "<p>Built it</p>",
            },
          ],
        },
        skills: { title: "Skills", columns: 1, hidden: false, items: [] },
        languages: { title: "Languages", columns: 1, hidden: false, items: [] },
        interests: { title: "Interests", columns: 1, hidden: false, items: [] },
        awards: { title: "Awards", columns: 1, hidden: false, items: [] },
        certifications: {
          title: "Certifications",
          columns: 1,
          hidden: false,
          items: [],
        },
        publications: {
          title: "Publications",
          columns: 1,
          hidden: false,
          items: [],
        },
        volunteer: { title: "Volunteer", columns: 1, hidden: false, items: [] },
        references: {
          title: "References",
          columns: 1,
          hidden: false,
          items: [],
        },
      },
      customSections: [],
      metadata: {
        template: "glalie",
        layout: [[["summary", "experience"], ["skills"]]],
        css: { value: "", visible: false },
        page: { margin: 14, format: "a4" },
        theme: {
          primary: "rgba(202, 138, 4, 1)",
          text: "rgba(0, 0, 0, 1)",
          background: "rgba(255, 255, 255, 1)",
        },
        typography: {
          font: { family: "Merriweather", variants: ["400"], size: 11 },
          lineHeight: 1.5,
          hideIcons: false,
        },
        notes: "",
      },
    });
    const metadata = converted.metadata as Record<string, unknown>;
    const sections = converted.sections as Record<string, unknown>;
    const projects = (sections.projects as Record<string, unknown>)
      .items as Array<Record<string, unknown>>;

    expect(converted.picture).toEqual(
      expect.objectContaining({
        hidden: false,
        url: "/api/design-resume/assets/picture/content",
        size: 96,
        rotation: 0,
        shadowWidth: 0,
      }),
    );

    expect(metadata).toEqual(
      expect.objectContaining({
        template: "glalie",
        layout: {
          sidebarWidth: 35,
          pages: [
            {
              fullWidth: [],
              main: ["summary", "experience"],
              sidebar: ["skills"],
            },
          ],
        },
        css: { enabled: false, value: "" },
      }),
    );

    expect(metadata.page as Record<string, unknown>).toEqual(
      expect.objectContaining({
        marginX: 14,
        marginY: 14,
        format: "a4",
        locale: "en-US",
      }),
    );

    expect(projects[0]).toEqual(
      expect.objectContaining({
        id: "project-1",
        hidden: false,
        name: "Job Ops",
      }),
    );
  });
});
