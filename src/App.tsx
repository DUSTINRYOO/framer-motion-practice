import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { click } from "@testing-library/user-event/dist/click";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: fit-content;
  gap: 10px;
  margin-bottom: 40px;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);

  border-radius: 20px;
  width: 400px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};
const Btn = styled(motion.button)`
  width: 100px;
  position: absolute;
  bottom: 80px;
  height: 50px;
  background-color: white;
  color: blue;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 600;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const myVar = {
  hover1: { scale: 1.1, x: -20, y: -10 },
  hover2: { scale: 1.1, x: 20, y: -10 },
  hover3: { scale: 1.1, x: -20, y: 10 },
  hover4: { scale: 1.1, x: 20, y: 10 },
  click: { scale: 1.1, color: "orange" },
};

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [id, setId] = useState<null | number>(null);
  const [circle, setCircle] = useState<boolean>(true);
  return (
    <Wrapper>
      <Grid>
        {[1, 2, 3, 4].map((n) => (
          <Box
            onClick={() => setId(n)}
            key={n}
            layoutId={n + ""}
            variants={myVar}
            whileHover={"hover" + n}
          >
            {(n === 2 && circle) || (n === 3 && !circle) ? (
              <Circle layoutId="Circle" />
            ) : null}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id + ""}
              style={{ width: 400, height: 200, backgroundColor: "white" }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Btn variants={myVar} whileTap="click" onClick={() => setCircle(!circle)}>
        Switch
      </Btn>
    </Wrapper>
  );
}

export default App;
