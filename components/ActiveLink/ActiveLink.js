import { useRouter } from "next/router";

function ActiveLink({ children, href, shallow = false }) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? "red" : "black",
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href, undefined, { shallow: shallow });
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}

export default ActiveLink;
