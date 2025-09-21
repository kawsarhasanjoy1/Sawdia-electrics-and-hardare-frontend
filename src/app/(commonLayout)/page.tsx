import AllCategory from "@/component/Home/AllCategory/AllCategory";
import Blog from "@/component/Home/Blog/Blog";
import Branch from "@/component/Home/Brance/Brance";
import Carousel from "@/component/Home/Carousel/Carousel";
import FeaturedProducts from "@/component/Home/NewArrival/NewArrival";
import Product from "@/component/Home/Products/Product";
import Review from "@/component/Home/Review/Review";
import SeasonalOffersPage from "@/component/Home/SeasonalOffer/SeasonalOffer";
import OurServices from "@/component/Home/Services/OurServicest";
import Container from "@/component/shared/Container";

export default function Home() {
  return (
    <Container>
      <Carousel />
      <AllCategory />
      <Product />
      <SeasonalOffersPage />
      <FeaturedProducts />
      <OurServices />
      <Review />
      <Blog />
      <Branch />
    </Container>
  );
}
