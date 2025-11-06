import InstaStoryStatus from "@/components/arts/InstaStoryStatus/insta-story-status";

export default async function Experimental() {
  return (
    <div className="flex min-h-screen flex-row items-center justify-center">
      <div className="group flex items-center justify-center gap-8">
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
      </div>
    </div>
  );
}
