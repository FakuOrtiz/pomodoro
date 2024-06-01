import { useEffect, useState } from "preact/hooks";
import Button from "./Timer/Button";

const getPhrase = async () => {
  try {
    const resp = await fetch("/phrases");

    return resp.json();
  } catch (error) {
    console.log(error);
  }
};

const DayPhrase = () => {
  const [res, setRes] = useState<any>();

  useEffect(() => {
    fetchPhrase();
  }, []);

  const fetchPhrase = async () => {
    setRes(await getPhrase());
  };

  return (
    <>
      <section class="max-w-full w-[512px]">
        <article
          class="min-w-full italic duration-200
      ease-out transition transform origin-top-right h-28 sm:h-20"
        >
          <p class="my-4">"{res?.phrase}"</p>
          <h5 class="text-right">"{res?.author}"</h5>
        </article>
      </section>
      <div class="min-w-full mb-14 mt-4">
        <Button action={fetchPhrase} title="Otra frase" styles="my-4" />
      </div>
    </>
  );
};

export default DayPhrase;
