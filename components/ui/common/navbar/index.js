import Link from "next/link";
import { useWeb3 } from "@components/provider";
import { Button } from "@components/ui/common";
import { useAccount } from "@components/hooks/web3/useAccount";
import { useRouter } from "next/router";

export default function Navbar() {
  const { connect, isWeb3Loaded, isLoading } = useWeb3();
  const { account } = useAccount();
  const { pathname } = useRouter();
  return (
    <section>
      <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div className="flex items-center justify-between">
              <Link href="/">
                <a className="mr-8 font-medium text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/">
                <a className="mr-8 font-medium text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </Link>
              <Link href="/marketplace">
                <a className="mr-8 font-medium text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <Link href="/">
                <a className="mr-8 font-medium text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </Link>
              <Link href="/">
                {isLoading ? (
                  <Button
                    onClick={connect}
                    disabled={true}
                    className="text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Loading...
                  </Button>
                ) : isWeb3Loaded ? (
                  account.data ? (
                    <Button className="text-white bg-yellow-600 cursor-default hover:bg-yellow-700 ">
                      Hi {account.isAdmin ? "Admin" : "there"}
                    </Button>
                  ) : (
                    <Button
                      onClick={connect}
                      className="text-white bg-indigo-600 hover:bg-indigo-700 "
                    >
                      Connect
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={() =>
                      window.open("https://metamask.io/download.html")
                    }
                    className="text-white bg-indigo-600 hover:bg-indigo-700 "
                  >
                    Install Metamask
                  </Button>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </div>
      {account.data && !pathname.includes("/marketplace") && (
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="p-2 text-white bg-indigo-600 rounded-md">
            Account: {account.data}
          </div>
        </div>
      )}
    </section>
  );
}
