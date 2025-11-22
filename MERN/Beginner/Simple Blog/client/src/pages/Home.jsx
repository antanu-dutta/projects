import Container from "../components/reusable/Container";
import BlogCard from "../components/ui/BlogCard";

const Home = () => {
  return (
    <div className="pt-24">
      <Container>
        <div className="flex items-center flex-col gap-3">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </Container>
    </div>
  );
};

export default Home;
