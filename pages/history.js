import { ListGroup, Card, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/History.module.css";
export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const router = useRouter();

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = (e, index) => {
    e.stopPropagation();
    setSearchHistory((current) => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  };

  return (
    <>
      <Head>
        <title>Search History</title>
      </Head>
      <ListGroup>
        {parsedHistory.length > 0 ? (
          parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}>
              {Object.keys(historyItem).map((key) => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}>
                &times;
              </Button>
            </ListGroup.Item>
          ))
        ) : (
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>
              <Card.Text>Try searching for some artwork.</Card.Text>
            </Card.Body>
          </Card>
        )}
      </ListGroup>
    </>
  );
}
