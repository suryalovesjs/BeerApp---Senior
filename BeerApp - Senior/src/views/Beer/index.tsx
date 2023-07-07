import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Beer as IBeer } from "../../types";
import { useParams } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Banner from "../../components/Banner";
import { LocalBarOutlined } from "@mui/icons-material";
import { fetchBeer, setBeerData } from "../../store/actions";
import { RootState } from "../../store";

const mapState = (state: RootState) => ({
  beerData: state.beer.beerData,
});

const mapDispatch = {
  fetchBeer,
  setBeerData,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Beer: React.FC<PropsFromRedux> = ({
  beerData,
  fetchBeer,
  setBeerData,
}) => {
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    if (!beerData[id]) {
      fetchBeer(id);
    }
  }, [id]);

  if (!id) {
    return <h1>Wrong info</h1>;
  }

  const beer = beerData[id] as IBeer;

  const Label = styled("b")(({ theme }) => {
    return {
      fontWeight: "bold",
    };
  });

  const iframeSrc = `https://maps.google.com/maps?q=${beer?.latitude},${
    beer?.longitude
  }&title=${encodeURIComponent(beer?.name || "Beer")}&output=embed`;

  const AddressInfo = ({ beer }: { beer: IBeer }) => (
    <Grid container spacing={2} padding={15} justifyItems="center">
      <Grid item xs={12}>
        <Typography variant="h1" fontSize={30} fontWeight={100}>
          <Label>Brewery Type:</Label> {beer?.brewery_type}
        </Typography>
        <Typography variant="body1" fontSize={30} fontWeight={100}>
          <Label>Address:</Label> {beer?.address_1} {beer?.address_2}{" "}
          {beer?.address_3}, {beer?.city}, {beer?.state_province},{" "}
          {beer?.postal_code}, {beer?.country}
        </Typography>
        <Typography variant="body1" fontSize={30} fontWeight={100}>
          <Label>Phone:</Label> <a href={`tel:${beer?.phone}`}>{beer?.phone}</a>
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Banner
        medium
        image="/beer-header.jpg"
        title={beer?.name}
        icon={<LocalBarOutlined />}
      />
      <Grid container spacing={2} padding={2} alignItems="center">
        <Grid item spacing={1} xs={6}>
          <Paper>{beer && <AddressInfo beer={beer} />}</Paper>
        </Grid>
        <Grid item xs={6}>
          <iframe
            width="100%"
            height="500"
            src={iframeSrc}
            style={{ border: "none" }}
            title="shop-map"
          ></iframe>
        </Grid>
      </Grid>
    </>
  );
};

export default connector(Beer);
