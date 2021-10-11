import React from 'react'
import { Col, Container, Row } from 'reactstrap'

export default function FeedbackMessage() {
    return (
        <Container className="my-3">
            <Row>
              <Col style={{ backgroundColor: "#b5e61d66" }}>
                <p>〇〇さん、今日もお疲れ様です。</p>
                <p>
                  昨日は わくわく/楽しい/嬉しい
                  の感情が多く、ポジティブに過ごせた ようですね。
                </p>
                <p>
                  ○○さんは最近、 朝 に イライラ/緊張/ストレス
                  を感じることが多いようです。
                </p>
                <p>
                  「イライラしてしまっているな」と感じているのに気付いた
                  ときは、10秒だけでも深呼吸 してみてはいかがでしょう？
                </p>
                <p>少しの行動で気持ちは前向きになっていきますよ。</p>
              </Col>
            </Row>
          </Container>
    )
}
