import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

function NewMeetup() {
  const router = useRouter();

  const onAddMeetupHandler = async (enteredData) => {
    console.log("responseasdasdhjasdjashdgaskdjhg");
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    const data = await response.json();

    console.log(data);
    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add a new Meetup</title>
        <meta name="description" content="Add your own meetups" />
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler}></NewMeetupForm>;
    </Fragment>
  );
}

export default NewMeetup;
