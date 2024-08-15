"use client";

const UserClassPage = () => {
  const handName = () => {
    let avatar : number[] = [0];
    for (let i = 1; i < 36 ; i++) {
      avatar[i];
    }
    const inits = Math.floor(Math.random() * avatar.length);
    return avatar[inits];
  };
  return (
    <div>
      <button className=" btn btn-lg btn-success" onClick={() => handName()}>random number is {handName()}</button>
    </div>
  )
}

export default UserClassPage
