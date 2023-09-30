import { QuartzComponentConstructor } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  function Footer() {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer>
        <hr />
        <div class="footer-container">

        <p>
          Amaury Hamon, {year}
          {/* Created with <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a>, © {year} */}
        </p>
        <ul >
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a class="footer-link" href={link} target="_blank">{text}</a>
            </li>
          ))}
        </ul>
        </div>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
