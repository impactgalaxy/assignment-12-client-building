import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Apartment({ apartment }) {
  const {
    image,
    floor_no,
    block_name,
    apartment_no,
    rent,
    description,
    _id,
    apartment_booked,
  } = apartment || {};
  console.log(apartment_booked, _id);
  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={image}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            className="h-80 w-full object-cover"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{description}</Heading>

            <Box>
              <Text fontWeight="semibold" color="gray.500">
                Block: {block_name}
              </Text>
              <Text fontWeight="semibold" color="gray.500">
                Floor number: {floor_no}
              </Text>
              <Text fontWeight="semibold" color="gray.500">
                Apartment number: {apartment_no}
              </Text>
            </Box>
            <Text color="blue.600" fontSize="2xl">
              ${rent} per month
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            {apartment_booked && apartment_booked === "booked" ? (
              <Button
                colorScheme="red"
                onClick={() => {
                  Swal.fire({
                    title: "Apartment Booked",
                    text: "Please try another apartment",
                    icon: "error",
                    showConfirmButton: true,
                  });
                }}>
                Already Booked
              </Button>
            ) : (
              <Button variant="solid" colorScheme="blue">
                <Link to={`/apartment-agreement/${_id}`}>Agreement</Link>
              </Button>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}
Apartment.propTypes = {
  apartment: PropTypes.object,
};
