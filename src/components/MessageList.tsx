import useWaves from "../hooks/useWaves";

const MessageList: React.FC = (): React.ReactElement => {
  const { waves } = useWaves();

  return (
    <table className="table-fixed w-full">
      <thead>
        <tr className="border-b border-opacity-20 text-heading">
          <th className="w-2/6 p-2 text-left">SENDER</th>
          <th className="w-3/5 p-2 text-left">MESSAGE</th>
          <th className="w-2/6 p-2 text-left">RECEIVED AT</th>
        </tr>
      </thead>
      <tbody>
        {waves &&
          waves.map((wave) => (
            <tr key={`${wave.address}${wave.timestamp.toISOString()}`}>
              <td className="break-words align-top p-2">
                {truncate(wave.address)}
              </td>
              <td className="break-words align-top p-2">{wave.message}</td>
              <td className="break-words align-top p-2">
                {wave.timestamp.toDateString()}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default MessageList;

export const truncate = (str: string) => {
  return `${str.substr(0, 5)}...${str.substr(str.length - 5, 5)}`;
};
