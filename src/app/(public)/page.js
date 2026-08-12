import Button from "../../components/ui/button/Button";
import Tag from "../../components/ui/tags/Tag";

import HeartIcon from "../../components/icons/HeartIcon";
import PreviousArrowIcon from "../../components/icons/PreviousArrowIcon";
import NextArrowIcon from "../../components/icons/NextArrowIcon";
import PaperPlane from "../../components/icons/PaperPlane";

export default function Home() {
  return (
    <>
      <Button variant="action" icon={<HeartIcon />} visualState="inactive">
        BOOK
      </Button>
      <br />
      <Button variant="priceAction" price={500}>
        Book
      </Button>
      <br />
      <span>
        <Button variant="nav" icon={<PreviousArrowIcon />}></Button>
        <br />
        <Button variant="nav" icon={<NextArrowIcon />}></Button>
      </span>
      <br />
      <Button variant="action" icon={<PaperPlane />}>
        Submit Form
      </Button>
      <br />
      <Button variant="selector-wrap">1-2 day</Button>
      <br />
      <Button variant="selector-fill" visualState="active">
        Delivery
      </Button>
      <br />
      <Button variant="selector-fill" visualState="inactive">
        Pickup
      </Button>
      <br />
    </>
  );
}
