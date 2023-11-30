interface ICurrentToken {
  amount: string;
}

const CurrentToken = ({ amount }: ICurrentToken) => {
  return (
    <div className="py-4 px-6 token-form-light dark:token-form-dark">
      <p className="text-xs">Amount</p>
      <p className="text-lg">{amount}</p>
    </div>
  );
};

export default CurrentToken;
