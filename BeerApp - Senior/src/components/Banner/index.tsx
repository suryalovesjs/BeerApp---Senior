import { Box, Typography, styled } from "@mui/material";

interface Props {
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  image?: string;
  title?: string;
  icon?: React.ReactNode;
}

const IconWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  border: "3px solid white",
  marginRight: "16px",
});

const ContentWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
});

const Banner = ({ small, medium, large, image, title, icon }: Props) => {
  const style = {
    backgroundImage: `url(${image ? image : "/beer-header-2.jpg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: small ? "300px" : medium ? "400px" : large ? "500px" : "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    top: 0,
    left: 0,
    width: "100vw",
    position: "relative",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: `rgba(0, 0, 0, ${title ? "0.5" : "0"})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    color: "white",
    zIndex: 1,
  };

  return (
    <Box component="main" sx={style}>
      <Box sx={overlayStyle}>
        {title && (
          <ContentWrapper>
            {icon && <IconWrapper>{icon}</IconWrapper>}
            <Typography variant="h2" align="center" fontWeight="500">
              {title}
            </Typography>
          </ContentWrapper>
        )}
      </Box>
    </Box>
  );
};

export default Banner;
