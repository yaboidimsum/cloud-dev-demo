// import InstaStoryStatus from "@/components/arts/InstaStoryStatus/insta-story-status";
// import TwitterRefreshTimeline from "@/components/arts/TwitterRefreshTimeline/twitter-refresh-timeline";
import SpotifyTimelineCard from "@/components/arts/SpotifyTimelineCard/spotify-timeline-card";
export default async function Experimental() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {/* <TwitterRefreshTimeline /> */}
      {/* <div className="group flex items-center justify-center gap-8">
        <div className="transition-all duration-300 ease-out hover:scale-105 hover:mix-blend-normal hover:[filter:blur(0px)] group-hover:scale-95 group-hover:[filter:blur(2px)]">  
          <InstaStoryStatus
            image="https://images.genius.com/4d7a3bfcf312d0fe2fcbdff4064c449d.1000x1000x1.jpg"
            title="If It Only Gets Better"
            artist="Joji"
            user="George Miller"
          />
        </div>
        <div className="transition-all duration-300 ease-out hover:scale-105 hover:mix-blend-normal hover:[filter:blur(0px)] group-hover:scale-95 group-hover:[filter:blur(2px)]">
          <InstaStoryStatus
            image="https://scontent-cgk2-2.cdninstagram.com/v/t51.2885-19/435274715_400251902639425_2568560913834926441_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby45NTguYzEifQ&_nc_ht=scontent-cgk2-2.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2QHVTPsTKLmVDk7tt06iJCKENy394UkUxtMBwmmCAJt75GwXLjUGwvHcC8mREG7eCKM&_nc_ohc=_gjurLwk7d4Q7kNvwFoCIlJ&_nc_gid=G-56BPAfhVZNVJbobnjZsQ&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfjwFu4mBt5S-m2T9a0s75BrZufsqGBvMBp-_Hf5vzluQw&oe=69112AA1&_nc_sid=7a9f4b"
            title="Stained Glass Window"
            artist="Sunday (1994)"
            user="Paige Turner"
          />
        </div>
        <div className="transition-all duration-300 ease-out hover:scale-105 hover:mix-blend-normal hover:[filter:blur(0px)] group-hover:scale-95 group-hover:[filter:blur(2px)]">
          <InstaStoryStatus
            image="https://i.scdn.co/image/ab67616d0000b273b9c93163c53545df6182e7ef"
            title="Flaming Hot Cheetos"
            artist="Clairo"
            user="Claire Cottrill"
          />
        </div>
      </div> */}
      <div className="rounded-4xl overflow-hidden">
        <SpotifyTimelineCard
          user="awann ⛅"
          song="Sexy To Someone"
          artist="Clairo"
          album="Charm"
          profileImage="https://avatars.githubusercontent.com/u/124599?v=4"
          albumImage="https://i.scdn.co/image/ab67616d0000b273193c2fafdce8f116b5ca0a78"
          gradientColor={`#0E0E0E`}
        />
        <SpotifyTimelineCard
          user="peggy"
          song="Rain"
          artist="Sunday (1994)"
          album="Devotion"
          profileImage="https://scontent-cgk2-2.cdninstagram.com/v/t51.2885-19/435274715_400251902639425_2568560913834926441_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby45NTguYzIifQ&_nc_ht=scontent-cgk2-2.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2QH1Q3A2W68oQz-I5GhkfpHFVHgB57Lsx_Yp3WfwcidP2iRDOc5iSg_wJp-jK0KOSQo&_nc_ohc=DpqMMez8cGkQ7kNvwE7qmsR&_nc_gid=vLhoW9DLu-5r-heT_qaBlQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Afiluc0eu64JQH1iMRSHB9eTqfa_YOBGbp2hZAaQvsTgxw&oe=6919F4A1&_nc_sid=8b3546"
          albumImage="https://images.genius.com/cad3deb94d7f3e0b26d1a2837626389b.1000x1000x1.jpg"
          gradientColor={`#0E0E0E`}
        />
        <SpotifyTimelineCard
          user="invisigal "
          song="RAWFEAR"
          artist="Twenty One Pilots"
          album="Breach"
          profileImage="https://static.wikia.nocookie.net/dispatch/images/5/57/Invisigal_mugshot.png/revision/latest?cb=20251104164510"
          albumImage="https://static.wikia.nocookie.net/twenty-one-pilots/images/9/9e/Breach.jpg/revision/latest?cb=20250521165146"
          gradientColor={`#0E0E0E`}
        />
        <SpotifyTimelineCard
          user="lucy🌙"
          song="Know You Naked"
          artist="LANY"
          album="Soft"
          profileImage="https://i.pinimg.com/736x/15/32/58/153258e920f5df9a7a0bbb5a5da08b63.jpg"
          albumImage="https://i.scdn.co/image/ab67616d0000b2731826ebf3d171e17a23f59502"
          gradientColor={`#0E0E0E`}
        />
      </div>
    </div>
  );
}
