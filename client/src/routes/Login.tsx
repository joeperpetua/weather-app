import { useEffect, useState } from "react";
import { useAuth } from "../providers/Auth";
import { useNavigate, useSearchParams } from "react-router";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Heading, HeadingLevel } from "baseui/heading";
import { Block } from "baseui/block";


const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { username, login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redirect = searchParams.get("redirect") || 'dashboard';
    if (username) navigate(`/${redirect}`);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log('Handling submit', formData.get('username'), formData.get('password'));
    const response = await login(formData);

    console.log('Login response', response);

    if (!response.success) {
      const message = response.error?.message || 'Unknown error while logging in. Please try again.';
      setError(message);
    }
  }

  return (
    <Block display="flex" flexDirection="column" alignItems="center" height="80vh">
      <HeadingLevel>
        <Heading styleLevel={4} margin="4rem">Admin Dashboard</Heading>
      </HeadingLevel>
      <form onSubmit={handleSubmit}>
        <FormControl label="Username">
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            required
          />
        </FormControl>
        <FormControl label="Password" error={error}>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </FormControl>

        <Button type="submit">Login</Button>
      </form>
    </Block>
  )
}

export default Login;