import { useRouter } from "next/router";

function ActiveLink({ children, href, shallow = false }) {
  const router = useRouter();

  const isActive = router.asPath === href;

  const style2 = `text-black dark:text-white ${isActive && "text-purple-800"}`;

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href, undefined, { shallow: shallow });
  };

  return (
    <a href={href} onClick={handleClick} className={style2}>
      {children}
    </a>
  );
}

export default ActiveLink;
