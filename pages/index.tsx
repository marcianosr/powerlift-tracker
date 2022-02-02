import styles from "@/pages/index.module.css";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
	return (
		<Layout>
			<section>
				<h1>Nog 8 weken tot het NK</h1>
				<ul>
					<li>
						<Link href="/training/dag-a">Dag 1</Link>
					</li>
					<li>
						<Link href="/training/dag-b">Dag 2</Link>
					</li>
					<li>
						<Link href="/training/dag-c">Dag 3</Link>
					</li>
					<li>
						<Link href="/training/dag-d">Dag 4</Link>
					</li>
				</ul>
			</section>
		</Layout>
	);
}
