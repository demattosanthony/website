import { CopyEmailButton } from "./copy-email-button";

export default function ContactSection() {
  const email = "demattosanthony@gmail.com"; // Update with your actual email

  return (
    <section
      id="contact"
      className="w-full bg-[#1a1a1a] text-white py-16 sm:py-20 px-4 sm:px-8"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">
          Thanks for exploring my portfolio!
        </h2>

        {/* Chat Interface */}
        <div className="w-full max-w-3xl space-y-6">
          {/* User Question Bubble */}
          <div className="flex justify-end px-4 sm:px-0">
            <div className="bg-[#404040] text-white px-6 sm:px-8 py-4 sm:py-5 rounded-3xl max-w-xl">
              <p className="text-base sm:text-lg md:text-xl">
                Hey, how can i get in touch with you?
              </p>
            </div>
          </div>

          {/* Response with Profile Picture */}
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-linear-to-br from-green-400 via-green-500 to-emerald-500 p-[3px]">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#1a1a1a]">
                <img
                  src={"/profile-pic.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="bg-[#e8e8e8] text-black px-6 sm:px-8 py-4 sm:py-5 rounded-3xl rounded-tl-sm flex-1 max-w-2xl">
              <p className="text-base sm:text-lg md:text-xl">
                Hey! You can email me at <CopyEmailButton email={email} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
