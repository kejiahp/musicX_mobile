import Container from "@/components/container";
import AllGenres from "@/components/landing/all-genres";
import HelloUser from "@/components/landing/hello-user";
import LandingHeader from "@/components/landing/landing-header";
import SongListing from "@/components/landing/song-listing";

export default function LandingScreen() {
  return (
    <Container isScrollable>
      <LandingHeader />
      <HelloUser />
      <AllGenres />
      <SongListing />
    </Container>
  );
}
