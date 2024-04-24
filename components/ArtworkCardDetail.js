import { Card, Button } from "react-bootstrap";
import Error from "next/error";
import Link from "next/link";
import useSWR from "swr";
import { useAtom } from "jotai";
import { useState } from "react";
import { favouritesAtom } from "@/store";

const ArtworkCardDetail = ({ objectID }) => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

  const favouritesClicked = () => {
    if (showAdded) {
      setFavouritesList((current) => current.filter((fav) => fav !== objectID));
      setShowAdded(false);
    } else {
      setFavouritesList((current) => [...current, objectID]);
      setShowAdded(true);
    }
  };

  const { data, error, isLoading } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
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

  const {
    primaryImage,
    title,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    artistWikidata_URL,
    creditLine,
    dimensions,
  } = data;

  return (
    <Card>
      {primaryImage && (
        <Card.Img
          variant="top"
          src={
            primaryImage ||
            "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
          }
        />
      )}
      <Card.Body>
        <Card.Title>{title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate || "N/A"}
          <br />
          <strong>Classification:</strong> {classification || "N/A"}
          <br />
          <strong>Medium:</strong> {medium || "N/A"}
          <br />
          <br />
          <strong>Artist:</strong> {artistDisplayName || "N/A"}
          {artistWikidata_URL && (
            <span>
              {" ( "}
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                wiki
              </a>
              {" )"}
            </span>
          )}
          <br />
          <strong>Credit Line:</strong> {creditLine || "N/A"}
          <br />
          <strong>Dimensions:</strong> {dimensions || "N/A"}
        </Card.Text>
        <Button
          variant={showAdded ? "primary" : "outline-primary"}
          onClick={favouritesClicked}>
          {showAdded ? "+ Favourite ( added )" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
