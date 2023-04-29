type Props = {
  board: Array<Array<string | null>>;
  handleClick: (row: number, col: number) => void;
};

const Board = ({ board, handleClick }: Props) => {
  return (
    <div className="flex justify-center items-center flex-col gap-[10px]">
      {board?.map((row, i) => (
        <div className="flex gap-2" key={i}>
          {row?.map((cell, j) => (
            <button
              className="w-[100px] h-[100px] text-[50px] font-bold outline-none text-center border-none bg-[#333] text-white flex justify-center items-center hover:bg-[#bb76ff]"
              key={j}
              onClick={() => handleClick(i, j)}
            >
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
