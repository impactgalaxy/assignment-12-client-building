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

export default function Apartment({ apartment }) {
  const {
    image,
    floor_no,
    block_name,
    apartment_no,
    rent,
    description,
    title,
  } = apartment || {};
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
            <Heading size="md">{title}</Heading>
            <Text>{description}</Text>
            <Box>
              <Text fontWeight="semibold" color="gray.500">
                Block name: {block_name}
              </Text>
              <Text fontWeight="semibold" color="gray.500">
                Floor number: {floor_no}
              </Text>
              <Text fontWeight="semibold" color="gray.500">
                Apartment number: {apartment_no}
              </Text>
            </Box>
            <Text color="blue.600" fontSize="2xl">
              $ {rent}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Agreement
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}
Apartment.propTypes = {
  apartment: PropTypes.object,
};
