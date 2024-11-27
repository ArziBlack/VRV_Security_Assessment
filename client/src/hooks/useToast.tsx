import { useToast, Box, Text } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon, InfoIcon } from "@chakra-ui/icons";

const toastStyles = {
  container: {
    borderRadius: "25px",
    boxShadow: "lg",
    padding: "12px 16px",
    width: "fit-content",
    color: "white",
    display: "flex",
    alignItems: "center",
    fontFamily: "Metropolis",
    justifySelf: "center",
  },
  icon: {
    marginRight: "8px",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    margin: "0",
    padding: "0",
    fontSize: "14px",
    fontWeight: "400",
  },
};

const successStyles = {
  ...toastStyles,
  container: {
    ...toastStyles.container,
    bg: "#3b82f6",
    color: "#fff",
  },
};

const errorStyles = {
  ...toastStyles,
  container: {
    ...toastStyles.container,
    bg: "#FFF4F2",
    color: "black",
  },
};

const warningStyles = {
  ...toastStyles,
  container: {
    ...toastStyles.container,
    bg: "yellow",
    color: "black",
  },
};

const infoStyles = {
  ...toastStyles,
  container: {
    ...toastStyles.container,
    bg: "blue",
  },
};

const useCustomToast = () => {
  const toast = useToast();

  const showToast = (description: string, status: string) => {
    let styles;
    let Icon;

    switch (status) {
      case "success":
        styles = successStyles;
        Icon = CheckCircleIcon;
        break;
      case "error":
        styles = errorStyles;
        Icon = WarningIcon;
        break;
      case "warning":
        styles = warningStyles;
        Icon = WarningIcon;
        break;
      case "info":
        styles = infoStyles;
        Icon = InfoIcon;
        break;
      default:
        styles = toastStyles;
        Icon = InfoIcon;
    }

    toast({
      duration: 5000,
      isClosable: true,
      position: "top",
      render: () => (
        <Box {...styles.container}>
          <Icon {...styles.icon} />
          <Text {...styles.description}>{description}</Text>
        </Box>
      ),
    });
  };

  return showToast;
};

export default useCustomToast;
