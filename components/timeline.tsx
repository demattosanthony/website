import { timelineData } from "@/lib/timeline-data";

export default function Timeline() {
  return (
    <section id="timeline" className="w-full py-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center">
          Timeline
        </h2>

        {/* Visual Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line - hidden on mobile, shown on sm+ */}
          <div className="hidden sm:block absolute left-[140px] top-0 bottom-0 w-0.5 bg-border" />

          {/* Timeline Entries */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div key={index} className="relative">
                {/* Mobile Layout (default) - stacked vertically */}
                <div className="flex flex-col gap-4 sm:hidden">
                  {/* Year */}
                  <div className="text-center">
                    <span className="text-sm font-medium text-foreground/60">
                      {item.year ||
                        (item.subsections && item.subsections[0]?.year)}
                    </span>
                  </div>

                  {/* Logo */}
                  <div className="w-16 h-16 mx-auto">
                    <img
                      src={item.logo}
                      alt={item.logoAlt}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="w-full">
                    <h3 className="text-xl font-bold mb-4 text-center">
                      {item.title}
                    </h3>

                    {/* Direct content for items without subsections */}
                    {!item.subsections && item.highlights && (
                      <div className="text-foreground/80 text-sm leading-relaxed space-y-2">
                        {item.highlights.map((highlight, idx) => (
                          <p key={idx}>{highlight}</p>
                        ))}
                      </div>
                    )}

                    {/* Subsections for items with multiple roles */}
                    {item.subsections && (
                      <div className="space-y-6">
                        {item.subsections.map((subsection, subIdx) => (
                          <div key={subIdx}>
                            <div className="mb-2">
                              <h4 className="text-base font-semibold">
                                {subsection.title}
                              </h4>
                              <span className="text-foreground/60 text-sm">
                                {subsection.year}
                              </span>
                            </div>
                            <div className="text-foreground/80 text-sm leading-relaxed space-y-2">
                              {subsection.highlights.map((highlight, idx) => (
                                <p key={idx}>{highlight}</p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop Layout (sm+) - horizontal with timeline */}
                <div className="hidden sm:flex items-start gap-6">
                  {/* Year Label (Left) */}
                  <div className="w-[120px] text-right shrink-0">
                    <span className="text-base font-medium text-foreground/60">
                      {item.year ||
                        (item.subsections && item.subsections[0]?.year)}
                    </span>
                  </div>

                  {/* Center Dot */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-foreground border-4 border-background shadow-lg" />
                  </div>

                  {/* Content (Right) */}
                  <div className="flex-1 min-w-0 flex gap-6 items-start">
                    {/* Logo */}
                    <div className="w-20 h-20 shrink-0">
                      <img
                        src={item.logo}
                        alt={item.logoAlt}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>

                      {/* Direct content for items without subsections */}
                      {!item.subsections && item.highlights && (
                        <div className="text-foreground/80 text-base leading-relaxed space-y-2">
                          {item.highlights.map((highlight, idx) => (
                            <p key={idx}>{highlight}</p>
                          ))}
                        </div>
                      )}

                      {/* Subsections for items with multiple roles */}
                      {item.subsections && (
                        <div className="space-y-6">
                          {item.subsections.map((subsection, subIdx) => (
                            <div key={subIdx}>
                              <div className="mb-2">
                                <h4 className="text-lg font-semibold">
                                  {subsection.title}
                                </h4>
                                <span className="text-foreground/60 text-sm">
                                  {subsection.year}
                                </span>
                              </div>
                              <div className="text-foreground/80 text-base leading-relaxed space-y-2">
                                {subsection.highlights.map((highlight, idx) => (
                                  <p key={idx}>{highlight}</p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
