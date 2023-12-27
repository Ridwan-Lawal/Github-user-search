import { useEffect, useState } from "react";
import { GithubSvg, LocationSvg, TwitterSvg, WebsiteSvg } from "./Icons";
import { Audio } from "react-loader-spinner";
import "./index.css";

// built the loading company and the error component and also finish with the date

export default function App() {
  const [userSearch, setUserSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleThemeToggle() {
    setIsDarkMode((curTheme) => !curTheme);
  }

  function handleGetProfile() {
    async function getUserData() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`https://api.github.com/users/${userSearch}`);

        if (!res.ok) throw new Error("Profile Not found");

        const data = await res.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getUserData();
  }

  return (
    <div
      className={`font-mono transtion-all duration-500 ease-[ease-out]  py-8 min-h-screen overflow-auto flex items-center justify-center ${
        isDarkMode ? "bg-darKModeBackground" : "bg-lightModeBackground"
      }    h-screen`}
    >
      <div className="max-w-lg sm:max-w-xl w-full  md:max-w-3xl px-8 mx-auto">
        <Nav isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
        <Form
          userSearch={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          onResetForm={() => setUserSearch("")}
          isDarkMode={isDarkMode}
          onGetProfile={handleGetProfile}
        />

        {/* main body */}
        <main
          className={`rounded-2xl mt-7 shadow-xl  px-8 md:pt-10 ${
            isDarkMode
              ? "bg-darkModeBodyColor shadow-gray-900"
              : "bg-white shadow-blue-200"
          } md:flex md:px-10 md:gap-10 pt-9 pb-12`}
        >
          {isLoading && <Loading />}
          {error && !isLoading && <ErrorMessage error={error} />}

          {!isLoading && !error && (
            <>
              <div className="self-start">
                <Svg
                  path={profileData?.avatar_url ?? "/image-avatar.png"}
                  styling="w-32 hidden md:block  sm:w-36 rounded-full"
                />
              </div>
              <aside className="w-full">
                <BioHeader isDarkMode={isDarkMode} profile={profileData} />
                <Bio
                  isDarkMode={isDarkMode}
                  bio={profileData?.bio ?? "This Profile has no bio"}
                />
                <ProfileStatistics isDarkMode={isDarkMode}>
                  <Statistic
                    isDarkMode={isDarkMode}
                    stats={profileData?.public_repos}
                  />
                  <Statistic
                    statsName="Followers"
                    isDarkMode={isDarkMode}
                    stats={profileData?.followers}
                  />

                  <Statistic
                    statsName="Following"
                    isDarkMode={isDarkMode}
                    stats={profileData?.following}
                  />
                </ProfileStatistics>
                <EngagementLinksFooter
                  isDarkMode={isDarkMode}
                  profile={profileData}
                />
              </aside>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex justify-center items-center">
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
      {/* <div className="lds-hourglass "></div> */}
    </div>
  );
}

function ErrorMessage({ error = "error occured" }) {
  return (
    <div className="text-center text-bold text-lg text-red-600 italic">
      <span className="text-3xl  block not-italic mb-2">😕</span>
      {error}!
    </div>
  );
}

function Nav({ isDarkMode, onThemeToggle }) {
  return (
    <nav className="flex items-center justify-between">
      <h1
        className={`${
          isDarkMode ? "text-white" : "text-darKModeBackground "
        } text-[27px] font-bold`}
      >
        devfinder
      </h1>
      <Themetoggle onClick={onThemeToggle}>
        <p
          className={`text-lg ${
            isDarkMode ? "text-white" : "text-lightModeTextColor"
          }  font-bold`}
        >
          {isDarkMode ? "Light" : "Dark"}
        </p>
        <section>
          <Svg path={isDarkMode ? "./icon-sun.svg" : "./icon-moon.svg"} />
        </section>
      </Themetoggle>
    </nav>
  );
}

function Themetoggle({ children, onClick }) {
  return (
    <div onClick={onClick} className="flex items-center cursor-pointer gap-3">
      {children}
    </div>
  );
}

function Form({ userSearch, onChange, isDarkMode, onGetProfile, onResetForm }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!userSearch) return;
    onGetProfile();
    onResetForm();
  }
  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className={` mt-8 py-1.5 shadow-xl pl-5 pr-2 rounded-xl ${
        isDarkMode
          ? "bg-darkModeBodyColor shadow-gray-900"
          : "bg-white shadow-blue-100"
      } items-center flex justify-between gap-3 `}
    >
      <section>
        <Svg path="./icon-search.svg" />
      </section>

      <input
        type="text"
        value={userSearch}
        onChange={onChange}
        className={`text-lg w-[65%] py-1 text-[14px] md:text-base  bg-inherit ${
          isDarkMode
            ? "text-white placeholder:text-white"
            : "text-darkModeBodyColor placeholder:text-lightModeTextColor"
        }  focus:outline-none `}
        placeholder="Search GitHub username..."
      />
      <button className=" py-3 rounded-lg bg-iconButtonColor text-white font-bold px-6">
        Search
      </button>
    </form>
  );
}

function BioHeader({ date = "25 Jan 2011", isDarkMode, profile }) {
  const [joinedDate, setJoinedDate] = useState(date);

  // // effect to format the date
  useEffect(
    function () {
      const convertDate = new Date(
        profile.created_at ? profile?.created_at : date
      );
      const formatDate = new Intl.DateTimeFormat("en-uk", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(convertDate);
      setJoinedDate(formatDate);

      // return function () {
      //   setJoinedDate(date);
      // };
    },
    [profile, date]
  );

  return (
    <header className="flex items-center gap-10 md:gap-0">
      {/* Bio Avatar */}
      <section>
        <Svg
          path={profile?.avatar_url ?? "/image-avatar.png"}
          styling="w-32 md:hidden sm:w-36 rounded-full"
        />
      </section>

      {/* Bio details */}
      <aside className="md:flex md:mt-2  md:justify-between w-full  md:items-start">
        {/* name and At */}
        <div>
          <h2
            className={` sm:text-[25px] text-lg font-bold 
           ${isDarkMode ? "text-white" : "text-darkModeBodyColor"}`}
          >
            {profile?.name ?? "Octocat"}
          </h2>
          <p className="text-iconButtonColor text-[12px] sm:text-base">
            @{profile?.login ?? "octocat"}
          </p>
        </div>
        {/* date */}

        <p
          className={` mt-1 text-[11px] sm:text-sm md:text-base ${
            isDarkMode ? "text-white" : "text-lightModeTextColor"
          } mt-0.5`}
        >
          Joined {joinedDate}
        </p>
      </aside>
    </header>
  );
}

function Bio({ bio = "This Profile has no bio", isDarkMode }) {
  return (
    <p
      className={`mt-6 text-[13px] md:text-base ${
        isDarkMode ? "text-white" : "text-lightModeTextColor"
      }`}
    >
      {bio}
    </p>
  );
}

function ProfileStatistics({ children, isDarkMode }) {
  return (
    <div
      className={`flex mt-9 gap-3 ${
        isDarkMode ? "bg-darKModeBackground" : "bg-lightModeBackground"
      } justify-between py-4  rounded-xl px-4 sm:px-9`}
    >
      {children}
    </div>
  );
}

function Statistic({ statsName = "Repo", stats = 8, isDarkMode }) {
  return (
    <div className={`text-center md:text-left space-y-1.5`}>
      <p
        className={` ${
          isDarkMode ? "text-white" : "text-lightModeTextColor"
        } text-xs sm:text-sm md:text-base`}
      >
        {statsName}
      </p>
      <p
        className={` ${
          isDarkMode ? "text-white" : "text-darkModeBodyColor"
        } text-lg sm:text-xl md:text-2xl font-bold`}
      >
        {String(stats).length > 4
          ? String(stats).split("").slice(0, 2).join("") + "K"
          : stats}
      </p>
    </div>
  );
}

function EngagementLinksFooter({ isDarkMode, profileData, profile }) {
  return (
    <footer
      className={`grid mt-10 ${
        isDarkMode ? "text-white" : "text-lightModeTextColor"
      }  grid-cols-1 sm:grid-cols-2 gap-5 `}
    >
      {/* location */}
      <EngagementLink
        textColor={!profile.location && "text-lightNotAvailableColor"}
        content={profile?.location ?? "Not Available"}
      >
        <LocationSvg
          fill={`${
            isDarkMode && profile.location
              ? "#ffffff"
              : !isDarkMode && profile.location
              ? "#4b6a9b"
              : "#bbb3ca"
          }`}
        />
      </EngagementLink>

      {/* github link */}
      <EngagementLink
        link={profile?.html_url}
        content={profile?.html_url ?? "Not Available"}
      >
        <WebsiteSvg fill={`${isDarkMode ? "#ffffff" : "#4b6a9b"}`} />
      </EngagementLink>

      {/* twitter link */}
      <EngagementLink
        link={
          profile.twitter_username &&
          `https://twitter.com/${profile.twitter_username}`
        }
        textColor={!profile.twitter_username && "text-lightNotAvailableColor"}
        content={profile?.twitter_username ?? "Not Available"}
      >
        <TwitterSvg
          fill={`${
            isDarkMode && profile.twitter_username
              ? "#ffffff"
              : !isDarkMode && profile.twitter_username
              ? "#4b6a9b"
              : "#bbb3ca"
          }`}
        />
      </EngagementLink>

      {/* company */}
      <EngagementLink
        textColor={!profile.company && "text-lightNotAvailableColor"}
        content={profile?.company ?? "Not Available"}
      >
        <GithubSvg
          fill={`${
            isDarkMode && profile.company
              ? "#ffffff"
              : !isDarkMode && profile.company
              ? "#4b6a9b"
              : "#bbb3ca"
          }`}
        />
      </EngagementLink>
    </footer>
  );
}

function EngagementLink({
  content = "San Francisco",
  textColor,
  children,
  link,
}) {
  return (
    <div className="flex gap-5">
      <section className="">{children}</section>
      <p className={`text-sm sm:text-sm md:text-base ${textColor}`}>
        <a href={link} target="_blank" rel="noreferrer">
          {content.split("").slice(0, 15).join("")}
        </a>
      </p>
    </div>
  );
}

function Svg({ path = "icon-search", styling }) {
  return <img src={`${path}`} className={` ${styling}`} alt="" />;
}
