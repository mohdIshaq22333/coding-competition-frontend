import { useState, useEffect } from "react";
import axios from "axios";
import Editor from "../components/editor";
import { Text, Box, Flex, useMediaQuery } from "@chakra-ui/react";

import "./App.css";

function App() {
  const [isSmallerThan768] = useMediaQuery("(max-width: 767px)");
  const [status, setStatus] = useState({});
  const [problem, setProblem] = useState(null);

  console.log(import.meta.env.VITE_APP_BASE_URL);

  const handleSubmit = (code) => {
    if (!code) return;
    setStatus({
      loading: true,
    });
    axios
      .post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/problems/${problem?.id}`,
        { code }
      )
      .then((val) => {
        setStatus({
          loading: false,
          casesResult: val?.data?.casesResult || [],
        });
      })
      .catch((err) => {
        console.log(err);
        setStatus({
          loading: false,
          err:
            err?.response?.data?.error ||
            err?.message ||
            "Something went wrong!",
        });
      });
  };

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/problems/${Math.ceil(
          Math.random() * 3
        )}`
      )
      .then((val) => {
        setProblem(val?.data);
      })
      .catch((err) => {
        console.log(err);
        setStatus({
          questionFetchingError:
            err?.response?.data?.error ||
            err?.message ||
            "Something went wrong!",
        });
      });
  }, []);

  return (
    <>
      <Box p={4}>
        <div className="container">
          {status?.questionFetchingError && (
            <Text fontSize={["xl", "2xl", "3xl"]} marginBottom={8}>
              {status?.questionFetchingError}
            </Text>
          )}
          <Text fontSize={["xl", "2xl", "3xl"]} marginBottom={8}>
            {problem?.title}
          </Text>
          <Text fontSize={["md", "lg", "xl"]} marginBottom={10}>
            {problem?.question}
          </Text>
          {problem?.examples && (
            <Flex
              direction={isSmallerThan768 ? "column" : "row"}
              alignItems={isSmallerThan768 ? "flex-start" : "center"}
              gap={10}
              marginTop={5}
              marginBottom={10}
            >
              {problem?.examples?.map((val, index) => {
                return (
                  <Flex
                    direction="row"
                    alignItems="baseline"
                    gap={5}
                    key={index}
                  >
                    <Text fontSize={["sm", "md", "lg"]}>Example: {` `}</Text>
                    <Box>
                      <Text textAlign={"start"} fontSize={["sm", "md", "lg"]}>
                        {val?.input}
                      </Text>
                      <Text textAlign={"start"} fontSize={["sm", "md", "lg"]}>
                        {val?.output}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
            </Flex>
          )}
          {problem?.title && (
            <Editor handleSubmit={handleSubmit} status={status} />
          )}
        </div>
      </Box>
    </>
  );
}

export default App;
