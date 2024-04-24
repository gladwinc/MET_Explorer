import { Card, Button } from "react-bootstrap";
import Error from "next/error";
import Link from "next/link";
import useSWR from "swr";

const ArtworkCard = ({ objectID }) => {
  const { data, error, isLoading } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return null;
  }

  const { primaryImageSmall, title, objectDate, classification, medium } = data;

  return (
    <Card>
      <Card.Img
        variant="top"
        src={
          primaryImageSmall ||
          "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        }
        alt="Card image"
      />
      <Card.Body>
        <Card.Title>{title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate || "N/A"}
          <br />
          <strong>Classification:</strong> {classification || "N/A"}
          <br />
          <strong>Medium:</strong> {medium || "N/A"}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="outline-primary">{`ID: ${objectID}`}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCard;
