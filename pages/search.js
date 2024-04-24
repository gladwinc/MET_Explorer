import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";

export default function AdvancedSearch() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [searchHisory, setSearchHistory] = useAtom(searchHistoryAtom);

  const submitForm = (data) => {
    let queryString = "";

    if (data.searchBy) {
      queryString += `${data.searchBy}=true`;
    }

    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }

    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }

    queryString += `&isOnView=${data.isOnView || false}`;

    queryString += `&isHighlight=${data.isHighlight || false}`;

    queryString += `&q=${data.query}`;

    router.push(`/artwork?${queryString}`);

    setSearchHistory((current) => [...current, queryString]);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              type="text"
              {...register("query", { required: true })}
              className={errors.query ? "is-invalid" : ""}
            />
            {errors.q && (
              <div className="invalid-feedback">This field is required.</div>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Label>Search By</Form.Label>
          <Form.Select className="mb-3" {...register("searchBy")}>
            <option value="title">Title</option>
            <option value="tags">Tags</option>
            <option value="artistOrCulture">Artist or Culture</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control type="text" {...register("geoLocation")} />
            <Form.Text className="text-muted">
              Case Sensitive String (ie "Europe", "France", "Paris", "China",
              "New York", etc.), with multiple values separated by the |
              operator
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text" {...register("medium")} />
            <Form.Text className="text-muted">
              Case Sensitive String (ie: "Ceramics", "Furniture", "Paintings",
              "Sculpture", "Textiles", etc.), with multiple values separated by
              the | operator
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Check
            type="checkbox"
            label="Highlighted"
            {...register("isHighlight")}
          />
          <Form.Check
            type="checkbox"
            label="Currently on View"
            {...register("isOnView")}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
