import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { classNames } from "../util/lang"
import style from "./styles/portfolioCards.scss"

const PortfolioCards: QuartzComponent = ({ allFiles, fileData, displayClass }: QuartzComponentProps) => {
  const portfolioItems = allFiles.filter(
    (f) => f.slug?.startsWith("Portfolio/") && f.slug !== "Portfolio/index",
  )

  if (portfolioItems.length === 0) {
    return null
  }

  return (
    <div class={classNames(displayClass, "portfolio-cards")}>
      {portfolioItems.map((item) => {
        const title = item.frontmatter?.title ?? item.slug ?? ""
        const description = item.frontmatter?.description ?? item.description?.text ?? ""
        const tags: string[] = (item.frontmatter?.tags as string[] | undefined) ?? []
        const socialImage = item.frontmatter?.socialImage as string | undefined
        const href = resolveRelative(fileData.slug!, item.slug!)

        return (
          <a href={href} class="portfolio-card internal">
            {socialImage && (
              <div class="portfolio-card-image">
                <img src={socialImage} alt={title} loading="lazy" />
              </div>
            )}
            <div class="portfolio-card-body">
              <h3 class="portfolio-card-title">{title}</h3>
              {description && <p class="portfolio-card-desc">{description}</p>}
              {tags.length > 0 && (
                <ul class="portfolio-card-tags">
                  {tags.map((tag) => (
                    <li class="portfolio-card-tag">{tag}</li>
                  ))}
                </ul>
              )}
            </div>
          </a>
        )
      })}
    </div>
  )
}

PortfolioCards.css = style
export default (() => PortfolioCards) satisfies QuartzComponentConstructor
