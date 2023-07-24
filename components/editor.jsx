import React from "react";
import Editor from "@monaco-editor/react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

function Editior({ handleSubmit, status = {} }) {
  const [code, setCode] = React.useState(`
  // Don't edit the function
  function main(parameter){
    // write your code here
     console.log(parameter);
  }
  `);
  return (
    <>
      {" "}
      <Editor
        height="43vh"
        width="80vw"
        defaultLanguage="javascript"
        onChange={setCode}
        value={code}
      />
      <Flex
        direction="row"
        alignItems="center"
        gap={10}
        justifyContent="Center"
        marginTop={10}
        marginBottom={5}
      >
        {status?.casesResult?.map((val) => (
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            key={val?.case}
          >
            {val?.passed ? (
              <CheckIcon color="green" w={4} mr={2} h={4} />
            ) : (
              <CloseIcon color="red" w={3} mr={2} h={3} />
            )}
            <Text fontSize={["md", "lg", "xl"]}>{val?.case}</Text>
          </Flex>
        ))}
      </Flex>
      {status?.err && <Text>{status?.err}</Text>}
      <Button
        onClick={() => handleSubmit(code)}
        isLoading={status?.loading}
        loadingText="Loading"
        colorScheme="teal"
        size="md"
      >
        Submit
      </Button>
    </>
  );
}

export default Editior;
