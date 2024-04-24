import {
  Form,
  FormControl,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { MdMuseum } from "react-icons/md";

export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function submitForm(e) {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${searchField}`);
    setIsExpanded(false);

    const queryString = `&title=true&q=${searchField}`;
    setSearchHistory((current) => [...current, queryString]);
    setSearchField("");
  }
  function toggleNavbar() {
    setIsExpanded(!isExpanded);
  }

  return (
    <>
      <Navbar
        className="fixed-top navbar-dark"
        bg="primary"
        expand="lg"
        expanded={isExpanded}>
        <Container>
          <Navbar.Brand>
            <MdMuseum />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" onClick={toggleNavbar} />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={() => setIsExpanded(false)}>
                  Home
                </Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/search"}
                  onClick={() => setIsExpanded(false)}>
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp;
            <Form className="d-flex" onSubmit={submitForm}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button type="submit" variant="success">
                Search
              </Button>
            </Form>
            &nbsp;
            <Nav>
              <NavDropdown title="Current Session">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === "/favourites"}
                    onClick={() => setIsExpanded(false)}>
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === "/history"}
                    onClick={() => setIsExpanded(false)}>
                    Search History
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
            &nbsp;
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
